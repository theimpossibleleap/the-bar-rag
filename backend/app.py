from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from langchain_chroma import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_ollama import OllamaEmbeddings
from langchain_ollama import ChatOllama
from langchain_community.document_loaders import TextLoader
from langchain.schema import Document
from langchain_core.prompts import PromptTemplate

app = Flask(__name__)

CORS(app)

model = ChatOllama(
    model="llama3.1:8b",
)

local_embeddings = OllamaEmbeddings(
    model="nomic-embed-text"
)

loader = TextLoader('./data/How_to_Mix_Drinks_cleaned.txt')
documents = loader.load()
split_documents = []
for doc in documents:
    lines = doc.page_content.split('\n')
    split_documents.extend([Document(page_content=line.strip()) for line in lines if line.strip()])

vectorstore = Chroma.from_documents(collection_name="howtomixdrinks", documents=split_documents, embedding=local_embeddings, persist_directory="./data/")

retriever = vectorstore.as_retriever()

template = """Use the following pieces of context to answer the question at the end. You are a helpful assistant that knows everything about cocktails.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.
Always say "Cheers! 🍸" at the end of the answer.

{context}

Question: {question}

Helpful Answer:"""
custom_rag_prompt = PromptTemplate.from_template(template)

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | custom_rag_prompt
    | model
    | StrOutputParser()
)


@app.route('/api/cocktail', methods=['POST'])
@cross_origin("http://localhost")
def generate_cocktail():
    body_data = request.get_json()
    query = body_data.get('query')
    cocktail = rag_chain.invoke(query)
    return jsonify({'status': 'Success', 'cocktail': cocktail, 'query': query}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

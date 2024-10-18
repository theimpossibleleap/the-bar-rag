# The Bar RAG

This cute little program utilizes RAG (Retrieval Augmented Generation) to use a Local LLM (Llama 3.1 - 8b) to pull context from Jerry Thomas's famous book:

> ### How to Mix Drinks,
> **or**
> ## The Bon-Vivants Companion,
> ### Containing clear and reliable directions for mixing all the beverages used in the United States, together with the most popular British, French, German, Italian, Russian, and Spanish recipes, embracing Punches, Juleps, Cobblers, Etc., Etc., Etc., in endless variety.

The project was built using `React + Vite` and `Tailwind` for the frontend, and `Python + Flask + Langchain` for the backend.

`Ollama` was used to local host the `Llama 3.1 (8b)` model for inference. I spent a good amount of time converting the "How to Mix Drinks..." book from `ePUB` to `txt` and cleaning up the text to ensure a clean, good context is provided to the model. 

Langchain loads the text file, splits the documents by `\n` newline, calls ChromDB to run the documents through an embedding model (`nomic-embed-text`), and store the vectors. The vector DB gets persisted in the directory. 

The chain is built to use the `ChromaDB` as a retriever, format the docs, construct a custom rag prompt, pass it to the LLM, and then parse the output. 

The API endpoint in Flask runs the chain, and returns the parsed output to display on the front end!

This was a two-day project to get a POC up and running. I've had this idea for a while, just had the time to do it over the past couple days. 

Cheers! 🍸
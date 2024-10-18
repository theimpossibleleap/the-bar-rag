import Markdown from "react-markdown";

const Experimental = () => {
    return (
        <>
            <div className="flex items-center justify-center w-full h-full text-white text-xs text-slate-200/50">
                <Markdown>
                    This is an experimental RAG (**Retrieval Augmented Generation**) integration using *Jerry Thomas's* book "*How to Mix Drinks...*" as context and a small, open-source Machine Learning Model (***Llama 3.1 - 8b***).
                    Ask a question about cocktails below!
                </Markdown>
            </div>
        </>
    )
}

export default Experimental;
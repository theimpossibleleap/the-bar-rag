import { useState } from 'react'
import { PuffLoader } from 'react-spinners'
import Experimental from './components/Experimental';

function App() {

  const [query, setQuery] = useState('');
  const [cocktail, setCocktail] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      setCocktail('');
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/cocktail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      });

      const result = await response.json();
      setCocktail(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error during fetch request: ", error);
    }
  }

  return (
    <>
      <div id="container" className='bg-gradient-to-br from-slate-950 to-slate-900 text-white h-screen min-h-fit w-full flex flex-col items-center font-mono text-sm p-12'>
        <div className='flex flex-col items-center justify-center mb-12 max-w-[750px]'>
          <div className='text-6xl mb-8 rotate-12'>🥃</div>
          <div className='text-5xl sm:text-6xl mb-6 font-extrabold'>The Bar RAG</div>
          <div className='text-md mb-4'>This cute little program utilizes RAG (Retrieval Augmented Generation) to use a Local LLM (Llama 3.1 - 8b) to pull context from Jerry Thomas's famous book:</div>
          <div className='text-md uppercase h-fit text-[#CFB53B] bg-slate-900 p-6 border border-slate-700'>
            <div className='mb-2 text-xl sm:text-2xl font-bold'>How To Mix Drinks,</div>
            <div className='mb-2'>or</div>
            <div className='mb-2 text-sm sm:text-lg'>The Bon-Vivants Companion,</div>
            <div className='mb-8 text-xs sm:text-sm'>Containing clear and reliable directions for mixing all the beverages used in the United States, together with the most popular British, French, German, Italian, Russian, and Spanish recipes, embracing Punches, Juleps, Cobblers, Etc., Etc., Etc., in endless variety.</div>
            <div className='italic font-bold'>By Jerry Thomas</div>
          </div>
        </div>
        <div id="window" className='border border-slate-600/50 h-fit w-full max-w-[750px] bg-slate-800/50 flex flex-col items-center justify-between p-4 shadow-2xl mb-2'>
          <div id="content" className='h-64 w-full bg-slate-600/20 border border-slate-200/5 p-12 flex items-center justify-center'>

            {cocktail ? (
                <div className='text-xl'>{cocktail.cocktail}</div>
            ) : isLoading ? (
              <PuffLoader color='#64748b' size={50} />
            ) : (
                <Experimental /> // Render generic text
            )}

          </div>
          <div id='input' className='w-full mt-4'>
            <form onSubmit={handleSubmit}>
              <label htmlFor='input'></label>
              <input id='input' type='text' value={query} onChange={(e) => setQuery(e.target.value)} className='w-full p-2 bg-slate-950 text-slate-100 border border-slate-200/20 placeholder:opacity-40 placeholder:italic' placeholder='Ask a question about "How to Mix Drinks..."'></input>
              <button type="submit" className='transition ease border border-slate-600/50 px-6 py-2 bg-slate-700 hover:bg-slate-950 text-slate-100 mt-4'>Ask</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
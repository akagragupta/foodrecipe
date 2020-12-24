import React,{useEffect,useState} from 'react';
import Recipe from './Recipe'
import './App.css';

function App() {

  const APP_ID="fd512932";
  const APP_KEY="47ff6a9434ccb3e0a4534ae90b7722d0";

  const [recipes, setRecipes]= useState([]);
  const [search, setSearch] =useState('');
  const [query, setQuery] = useState("chicken");

  // const exampleReq= `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`

  //useEffect is something that is going to run every time when you perform any action like click or something but adding an empty array runs 
  // it once only its like a intialisation block and you can add any values too 

  
  useEffect(()=>{
    console.log("Effect has been run");
    const getReceipes= async ()=>{
      const response= await fetch(`https:api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data= await response.json();
      console.log(data);
      setRecipes(data.hits);
    }
    getReceipes();
  }, [query])

  

  

  const updateSearch = e =>{
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch= e=>{
    e.preventDefault();
    setQuery(search);
  }

  

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form" action="">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">search</button>
      </form>
      <div className="recipes">
      {
        recipes.map(recipe=>(
          <Recipe key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients} />
        ))
      }
      </div>
    </div>
  );
}

export default App;

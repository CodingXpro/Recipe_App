import {useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useGetUserID} from '../hook/useGetUserID';



export const Home=()=>{
    const navigate=useNavigate();
    const userID=useGetUserID();
    const[savedRecipes,setSavedRecipes]=useState([]);

    const[recipes,setRecipes]=useState([]);
    useEffect(()=>{
        const fetchRecipe=async()=>{
            try{
                const response=await axios.get("http://localhost:3000/recipes");
                setRecipes(response.data);
                console.log(response.data);
                
            }catch(err){
                console.log(err);
            }
        }
        const fetchSavedRecipe=async()=>{
            try{
                const response=await axios.get(`http://localhost:3000/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            }catch(err){
                console.log(err);
            }
        }
        fetchRecipe();
        fetchSavedRecipe();

    },[]);
    const SaveRecipe=async(recipeID)=>{
        try{
            const response=await axios.put("http://localhost:3000/recipes",{recipeID,userID});
            console.log(response)
            setSavedRecipes(response.data.savedRecipes);
        }catch(err){
            console.log(err);
        }
    }
    const isSavedRecipes=(id)=>{
        savedRecipes.includes(id);
    }
    return <div><h1>Recipes</h1>
    <ul>
        {recipes.map((recipe)=>(
            <li key={recipe._id}>
                {savedRecipes.includes(recipe._id) && <h1>Already Saved</h1>}
                <div>
                    <h2>
                    {recipe.name}
                    </h2>
                    <button onClick={()=>SaveRecipe(recipe._id)} disable={isSavedRecipes(recipe._id)}>
                        {isSavedRecipes(recipe._id)? "Saved":"Save"}
                    </button>
                </div>
                <div className="instructions">
                <p>{recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name}/>
                <p>Cooking Time:{recipe.cookingTime}(minutes)</p>
            </li>
        ))}
    </ul>
    
    </div>
}


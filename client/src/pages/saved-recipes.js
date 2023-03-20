import {useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useGetUserID} from '../hook/useGetUserID';



export const SavedRecipes=()=>{
    const userID=useGetUserID();
    const[savedRecipes,setSavedRecipes]=useState([]);
    useEffect(()=>{
        const fetchSavedRecipe=async()=>{
            try{
                const response=await axios.get(`http://localhost:3000/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            }catch(err){
                console.log(err);
            }
        }
        
        fetchSavedRecipe();
    },[]);
    return <div><h1>Saved Recipes</h1>
    <ul>
        {recipes.map((recipe)=>(
            <li key={recipe._id}>
                <div>
                    <h2>
                    {recipe.name}
                    </h2>
                   
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


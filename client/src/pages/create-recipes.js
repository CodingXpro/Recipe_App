import {useState} from 'react';
import axios from 'axios';
import {useGetUserID} from '../hook/useGetUserID';
import {useNavigate} from 'react-router-dom';
// import {useEffect} from 'react-router-dom';


export const CreateRecipes=()=>{
    const userID=useGetUserID();
    const[recipe,setRecipe]=useState({
        name:"",
        ingredients:[],
        instructions:"",
        imageUrl:"",
        cookingTime:0,
        userOwner:userID
    });

    const navigate=useNavigate();
   
    const handleChange=(event)=>{
        const{name,value}=event.target;
        setRecipe({...recipe,[name]:value})

    }
    const handleIngredientChange=(event,idx)=>{
        const{value}=event.target;
        const ingredients=recipe.ingredients;
        ingredients[idx]=value;
        setRecipe({...recipe,ingredients})

    }
    const addIngredients=()=>{
        setRecipe({...recipe,ingredients:[...recipe.ingredients,""]})
    }
    
    const onSubmit=async(event)=>{
        event.preventDefault();
        try{
            await axios.post("http://localhost:3000/recipes",recipe);
            alert("Recipe Created");
            navigate('/');
        }catch(err){
            console.log(err);
        }
    }

    console.log(recipe)

    return <div className="create-recipe">
        <h2>Create Recipe</h2>
        <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={recipe.name} onChange={handleChange}/>
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient,idx)=>(
                <input key={idx} type="text" name="ingredients" value={ingredient} onChange={(event)=>handleIngredientChange(event,idx)}/>
            ))}

            <button onClick={addIngredients} type="button">Add Ingredient</button>
            {/* <label htmlFor="description">Description</label>
           <textarea id="description" name="description" onChange={handleChange}></textarea> */}
            <label htmlFor="instructions">Instructions</label>
            <textarea id="instructions" name="instructions" value={recipe.instructions} onChange={handleChange}></textarea>
            <label htmlFor="imageUrl">Image URl</label>
            <input type="text" id="imageUrl" name="imageUrl" value={recipe.imageUrl} onChange={handleChange} />
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input type="number" id="cookingTime" name="cookingTime" value={recipe.cookingTime} onChange={handleChange} />
            <button  type="submit">Create Recipe</button>
           
        </form>
    </div>
}


import {Link} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';



export const Navbar=()=>{
    const navigate=useNavigate();
    const[cookies,setCookies]=useCookies(["access_token"]);
    const LogOut=()=>{
        setCookies("access_token","");
        window.localStorage.removeItem("userID");
        navigate('/auth');
    }
    return(
        <div className="navbar">
        <Link to="/">Home</Link>
        <Link to='/create-recipe'>Create Recipes</Link>
        <Link to='/saved-recipes'> Saved Recipes</Link>
        {!cookies.access_token ?(  <Link to='/auth'>Login/Register</Link>):<button onClick={LogOut}>LogOut</button>}
      
    </div>
    );

}
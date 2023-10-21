import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../image/logo1.png'

function Navbar() {

  const navigate = useNavigate();

  
  const signup = () => {
    const url = 'https://my-course.auth.us-east-1.amazoncognito.com/login?client_id=4kutvm6dnl78huuir2fstb7agn&response_type=token&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fmaster.d1xdld4oro8y01.amplifyapp.com%2F&errorMessage=Something%20went%20wrong.%20Please%20try%20again.';
    window.open(url, '_blank');
  }

  const logout = () => {
    
    localStorage.removeItem('access_token');

    
    navigate('/');
    window.location.reload();
  }

  const create = () => {
    navigate('/create');
  }

  const home = () => {
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className='logo-container'>
        <div className='logo'><img src={logo} alt="" /></div>
        <h2>Zidyia</h2>
      </div>

      <ul>
        <li><button onClick={home}>Home</button></li>
        <li><button onClick={create}>Create</button></li>
        <li><button onClick={signup}>SignUp</button></li>

        <li><button onClick={logout}>Logout</button></li>
      </ul>
    </nav>
  )
}

export default Navbar;

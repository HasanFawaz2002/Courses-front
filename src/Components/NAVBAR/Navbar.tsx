import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  
  const signup = () => {
    const url = 'https://my-course.auth.us-east-1.amazoncognito.com/login?client_id=4kutvm6dnl78huuir2fstb7agn&response_type=token&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F';
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
      <div>Logo</div>

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

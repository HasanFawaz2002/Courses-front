import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
  const params = useParams();
  const userId = params.userId;
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
      const apiUrl = `https://puymqxfdjc.execute-api.us-east-1.amazonaws.com/dev/getUserById/${userId}`;

      axios
        .get(apiUrl)
        .then((response) => {
          if (response.data) {
            const userData = {
              name: response.data.name.S,
              email: response.data.email.S,
            };
            setUser(userData);
          } else {
            console.error('Unexpected data format in the response:', response.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    
  }, [ userId]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

      const apiUrl = `https://puymqxfdjc.execute-api.us-east-1.amazonaws.com/dev/updateUserById/${userId}`;

      axios
        .put(apiUrl, user)
        .then((response) => {
          if (response.status === 200) {
            navigate('/users');
          } else {
            console.error('User update failed:', response.data);
          }
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    
  };

  return (
    <div className="create-form">
      <h1>Update User</h1>
      <form onSubmit={handleFormSubmit}>
        <div className='create-form-container'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className='create-form-container'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;

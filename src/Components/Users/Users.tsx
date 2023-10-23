import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface User {
    UserId:string;
    name: string;
    email: string;
  }


function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [reloadData, setReloadData] = useState(true); 

    const navigate = useNavigate();

    useEffect(() => {
      if (reloadData) { 
          const apiUrl = 'https://puymqxfdjc.execute-api.us-east-1.amazonaws.com/dev/getAllUsers';

          axios
              .get(apiUrl)
              .then((response) => {
                  if (response.data) {
                      const formattedUsers = response.data.map((item: any) => ({
                          UserId: item.UserId.S,
                          name: item.name.S,
                          email: item.email.S,
                      }));
                      setUsers(formattedUsers);
                      console.log(formattedUsers);
                  } else {
                      console.error('Unexpected data format in the response:', response.data);
                  }
              })
              .catch((error) => {
                  console.error('Error fetching data:', error);
              });
          
          
          setReloadData(false);
      }
  }, [reloadData]);

      const handleDelete = (UserId: string) => {
    
        const deleteUrl = `https://puymqxfdjc.execute-api.us-east-1.amazonaws.com/dev/deleteUserById/${UserId}`;
        axios
          .delete(deleteUrl)
          .then(() => {
            
              
              setUsers((prevUsers) =>
              prevUsers.filter((user) => user.UserId !== UserId)
              );
            
          })
          .catch((error) => {
            console.error('Error deleting course:', error);
          });
      };

      const handleUpdate = (UserId: string) => {
        navigate(`/updateUsers/${UserId}`)
        }


  return (
    <div className='Home-container'>
        <h1>Users</h1>
        <table className='courses-table'>
            <thead>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </thead>
            <tbody>
                {users.map((user,index)=> (
                    <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className='btn-container'>
                        <button className='edit' onClick={()=>handleUpdate(user.UserId)}>Edit</button>
                        <button className='delete' onClick={() => handleDelete(user.UserId)}>Delete</button>
                    </td>
                </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default Users
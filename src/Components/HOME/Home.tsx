import { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Course {
  CourseID:string;
  name: string;
  description: string;
  credit: number;
}

function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access_token') || null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.hash.substr(1));
    const newAccessToken = urlSearchParams.get('access_token');
    const newIdToken = urlSearchParams.get('id_token');

    if (newAccessToken) {
      setAccessToken(newAccessToken);
      localStorage.setItem('access_token', newAccessToken);
      console.log('Access Token:', newAccessToken);
    }

    if (newIdToken) {
      setIdToken(newIdToken);
      console.log('Id Token:', idToken);
      localStorage.setItem('id_token', newIdToken);
      console.log('ID Token:', newIdToken);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      const apiUrl = 'https://bi4fbspng4.execute-api.us-east-1.amazonaws.com/dev/getAllCourses';

      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.data) {
            const formattedCourses = response.data.map((item: any) => ({
              CourseID:item.CourseID.S,
              name: item.name.S,
              description: item.description.S,
              credit: parseInt(item.credit.N, 10),
            }));
            setCourses(formattedCourses);
            console.log(formattedCourses);
          } else {
            setError('Unexpected data format in the response');
            console.error('Unexpected data format in the response:', response.data);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            setError('Unauthorized: Sign in to see the courses');
          } else {
            setError('Error fetching data');
            console.error('Error fetching data:', error);
          }
        });
    }
  }, [accessToken]);


  const handleDelete = (CourseID: string) => {
    
    const deleteUrl = `https://bi4fbspng4.execute-api.us-east-1.amazonaws.com/dev/deleteCourseById/${CourseID}`;
    axios
      .delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        
          
          setCourses((prevCourses) =>
            prevCourses.filter((course) => course.CourseID !== CourseID)
          );
        
      })
      .catch((error) => {
        console.error('Error deleting course:', error);
      });
  };

  const handleUpdate = (CourseID: string) => {
  navigate(`/update/${CourseID}`)
  }

  return (
    <>
      <div className="Home-container">
        <h1>Courses</h1>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <table className="courses-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Credit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                  <td>{course.credit}</td>
                  <td className='btn-container'>
                    <button className='edit' onClick={()=>handleUpdate(course.CourseID)}>Edit</button>
                    <button className='delete' onClick={() => handleDelete(course.CourseID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Home;

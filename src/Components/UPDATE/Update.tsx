import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Update() {
  const accessToken = localStorage.getItem('access_token');
  const params = useParams();
  const CourseID = params.CourseID;
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    name: '',
    description: '',
    credit: 0,
  });

  useEffect(() => {
    if (accessToken) {
      const apiUrl = `https://bi4fbspng4.execute-api.us-east-1.amazonaws.com/dev/getCourseById/${CourseID}`;

      axios
        .get(apiUrl)
        .then((response) => {
          if (response.data) {
            const courseData = {
              name: response.data.name.S,
              description: response.data.description.S,
              credit: parseInt(response.data.credit.N, 10),
            };
            setCourse(courseData);
          } else {
            console.error('Unexpected data format in the response:', response.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [accessToken, CourseID]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (accessToken) {
      const apiUrl = `https://bi4fbspng4.execute-api.us-east-1.amazonaws.com/dev/updateCourseById/${CourseID}`;

      axios
        .put(apiUrl, course , {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        .then((response) => {
          if (response.status === 200) {
            
           navigate('/'); 
          } else {
            
            console.error('Course update failed:', response.data);
          }
        })
        .catch((error) => {
          console.error('Error updating course:', error);
        });
    }
  };

  return (
    <div className="create-form">
      <h1>Update Course</h1>
      <form onSubmit={handleFormSubmit}>
        <div className='create-form-container'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
        </div>
        <div className='create-form-container'>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </div>
        <div className='create-form-container'>
          <label htmlFor="credit">Credit</label>
          <input
            type="number"
            name="credit"
            id="credit"
            value={course.credit}
            onChange={(e) => setCourse({ ...course, credit: parseInt(e.target.value, 10) })}
            />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;

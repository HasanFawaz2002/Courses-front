import { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';

interface Course {
  name: string;
  description: string;
  credit: number;
}

function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const apiUrl = 'https://bi4fbspng4.execute-api.us-east-1.amazonaws.com/dev/getAllCourses';

    axios.get(apiUrl)
      .then((response) => {
        if (response.data ) {
          const formattedCourses = response.data.map((item: any) => ({
            name: item.name.S,
            description: item.description.S,
            credit: parseInt(item.credit.N, 10),
          }));
          setCourses(formattedCourses);
          console.log(formattedCourses);
        } else {
          
          console.error('Unexpected data format in the response:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <div className='Home-container'>
        <h1>Courses</h1>
        <table className='courses-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Credit</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>{course.credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;

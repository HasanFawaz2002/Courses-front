import  { useState, ChangeEvent, FormEvent } from 'react';
import './Create.css';
import axios from 'axios';

function Create() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    credit: 0,
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    credit: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    
    setErrors({
      ...errors,
      [name]: validateInput(name, value),
    });
  };

  const accessToken = localStorage.getItem('access_token');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    const isFormValid = validateForm();

    if (isFormValid) {
      
      axios.post('https://bi4fbspng4.execute-api.us-east-1.amazonaws.com/dev/createCourse', formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      )
        .then((response) => {
          console.log('Course created successfully:', response.data);
          window.location.reload();
          
        })
        .catch((error) => {
          console.error('Error creating course:', error);
        });
    }
  };

  const validateInput = (name: string, value: string) => {
    let errorMessage = '';

    if (name === 'name' && value.trim() === '') {
      errorMessage = 'Name is required';
    } else if (name === 'description' && value.trim() === '') {
      errorMessage = 'Description is required';
    } else if (name === 'credit' && (isNaN(Number(value)) || Number(value) <= 0)) {
      errorMessage = 'Credit must be a positive number';
    }

    return errorMessage;
  };

  const validateForm = () => {
    const newErrors = {
      name: validateInput('name', formData.name),
      description: validateInput('description', formData.description),
      credit: validateInput('credit', formData.credit.toString()),
    };

    setErrors(newErrors);

    
    return Object.values(newErrors).every((error) => error === '');
  };

  return (
    <div className="create-form">
      <h1>Create Course</h1>
      <form onSubmit={handleSubmit}>
        <div className='create-form-container'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <span className="error">{errors.name}</span>
        </div>
        <div className='create-form-container'>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <span className="error">{errors.description}</span>
        </div>
        <div className='create-form-container'>
          <label htmlFor="credit">Credit</label>
          <input
            type="number"
            name="credit"
            id="credit"
            value={formData.credit}
            onChange={handleInputChange}
          />
          <span className="error">{errors.credit}</span>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Create;

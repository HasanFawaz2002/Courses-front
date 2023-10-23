import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

function CreateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
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


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    const isFormValid = validateForm();

    if (isFormValid) {
      axios
        .post(
          'https://puymqxfdjc.execute-api.us-east-1.amazonaws.com/dev/createUserCourse',
          formData)
        .then((response) => {
          console.log('User created successfully:', response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error creating user:', error);
        });
    }
  };

  const validateInput = (name: string, value: string) => {
    let errorMessage = '';

    if (name === 'name' && value.trim() === '') {
      errorMessage = 'Name is required';
    } else if (name === 'email' && !isValidEmail(value)) {
      errorMessage = 'Invalid email address';
    }

    return errorMessage;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: validateInput('name', formData.name),
      email: validateInput('email', formData.email),
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  return (
    <div className="create-form">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div className="create-form-container">
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
        <div className="create-form-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <span className="error">{errors.email}</span>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateUser;

import React, { useEffect, useState } from 'react';
import { postFormData } from '../services/ApiService';
import { validateEmail } from '../helpers/validateEmail';


function Form() {

  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);

  /* Event handlers */

  async function handleSubmit(event) {
    event.preventDefault();

    //Ensure first_name and email address are present
    if(!formData.first_name || !formData.email) {
      setMessage('First name and email are required fieds');
      return;
    };

    //Ensure email address is valid
    if (!validateEmail(formData.email)) {
      setMessage('Please enter a valid email address');
      return;
    };

    try {
      //Post the form data using the api service
      await postFormData(formData);

      //Reset form data after successful submission
      setFormData({});

      //Display a success message to the user
      setMessage('Form submitted successfully');
    } catch(error) {
      //Handle any errors that occur during the form submission
      console.error('Form submission error:', error);
      setMessage('An error occurred while submitting the form');
    };
  };

  function handleChange(event) {
    const { name, value, files } = event.target;

    //Actions concerning file input
    if (name === 'photo' && files && files.length > 0) {
      const file = files[0];

      //Ensure file does not exceed size restrictions
      if (file.size > 2 * 1024 * 1024 ) {
        setMessage('Please select a photo smaller than 2MB');
        //Reset the file input value
        event.target.value = '';
        return;
      };

      // Read the file as a Data URL (Base64 string)
      const reader = new FileReader();
      reader.onload = function () {
        setFormData((prevFormData) => ({
          ...prevFormData,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);

    //Actions concerning name & email input
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    };
  };

  /* Render component */

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="first_name"
        name="first_name"
        placeholder="First Name*"
        value={formData.first_name || ''}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        id="last_name"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name || ''}
        onChange={handleChange}
      />
      <input
        className='grow'
        type="email"
        id="email"
        name="email"
        placeholder="Your Email*"
        value={formData.email || ''}
        onChange={handleChange}
        required
      />
      <div className="file-input-container">
        <input
          type="file"
          id="photo"
          name="photo"
          placeholder="Photo"
          onChange={handleChange}
        />
        <label 
          className="file-input-content input"
          htmlFor="photo" 
        >
          Photo
          <svg className='file-input-icon' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.9687 3.00012L15.9687 17.0005M7.96875 17.0005C12.3887 17.0005 15.9687 20.7573 15.9687 25.0005C15.9687 20.7573 19.5488 17.0005 23.9688 17.0005M26 28.9999L6 28.9996" strokeWidth="2.04124" strokeMiterlimit="10"/>
          </svg>
        </label>
      </div>
      <button type="submit">Submit</button>
      {/* {message && (
        <p>{message}</p>
      )} */}
    </form>
  );
}

export default Form;

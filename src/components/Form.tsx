import { useState } from 'react';
import { IFormData } from '../types/Types'
import { postFormData } from '../services/ApiService';
import { validateEmail } from '../helpers/Form';


function Form() {

  const [formData, setFormData] = useState<IFormData>({
    first_name: '',
    last_name:'',
    email: '',
    photo: null
  });

  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //Ensure first_name and email address are present
    if(!formData.first_name || !formData.email) {
      setMessage('First name and email are required fieds');
      return
    }

    //Ensure email is valid
    if (!validateEmail(formData.email)) {
      setMessage('Please enter a valid email address');
      return
    }

    try {
      //Post the form data using the api serice
      await postFormData(formData)

      //Reset form data after successful submission
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        photo: null,
      });

      //Display a success message to the user
      setMessage('Form submitted successfully');
    } catch(error) {
      //Handle any errors that occur during the form submission
      console.error('Form submission error:', error)
      setMessage('An error occurred while submitting the form')
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (name === 'photo' && files && files.length > 0) {
      const file = files[0];

      //Ensure file does not exceed size restrictions
      if (file.size > 1 * 1024 * 1024 ) {
        setMessage('Please select a photo smaller than 2MB');
        //Reset the file input value
        event.target.value = '';
        return;
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
      }));      
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } 
  }

  return (
    <>
        <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="First Name*"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email*"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="file"
            id="photo"
            name="photo"
            placeholder="Photo"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Form;

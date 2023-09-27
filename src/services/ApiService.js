const baseUrl = 'http://localhost:3000/api';

// Post form data to the API endpoint
export async function postFormData(formData) {
  try{
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        formData
      )
    });
    return response.ok;
  } catch (err) {
    console.log(err);
  }
}
import { IFormData } from "../types/Types";

const baseUrl = 'https://platform.laudostaging.com/items/submissions';

// Post formData to the API endpoint
export async function postFormData(formData : IFormData) {
  try{
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        formData
      )
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}
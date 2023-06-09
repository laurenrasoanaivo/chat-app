
import { UpdateUser } from "@/commons/types";
import { API_URL } from "./apiUrl";

export const postRequest = async (url: string, data: any, options: RequestInit = {}) => {
  try {
    const response = await fetch(API_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Réponse:', responseData);
      return responseData;
    } else {
      console.error('Erreur lors de la requête POST:', response.statusText);
      throw new Error('Erreur lors de la requête POST');
    }
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

export const getRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(API_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Réponse:', responseData);
      return responseData;
    } else {
      console.error('Erreur lors de la requête GET:', response.statusText);
      throw new Error('Erreur lors de la requête GET');
    }
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

export const putRequest = async (url: string, data: any, options: RequestInit = {}) => {
  try {
    const response = await fetch(API_URL + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Réponse:', responseData);
      return responseData;
    } else {
      console.error('Erreur lors de la requête PUT:', response.statusText);
      throw new Error('Erreur lors de la requête PUT');
    }
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};
import { postRequest } from '../utils/apiUtils';
import Cookies from 'universal-cookie';
import { CreateUser, LoginUser } from '@/commons/types';
import { toast } from 'react-toastify';

export const onLogin = async (data: LoginUser) => {
  const cookies = new Cookies();
  const url = '/users/login';
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const userData = await postRequest(url, data, options);
    cookies.set('token', userData.user.token, {sameSite:'none'});
    toast('Login successfuly', { hideProgressBar: true, autoClose: 2000, type: 'success' })
    window.location.href = '/profile';
  } catch (error) {
    console.error('Erreur:', error);
  }

  return {
    props: {},
  };
};

export const onSignup = async (data: CreateUser) => {
  
  const url = '/users';
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const userData = await postRequest(url, data, options);
    toast('User created successfuly \n Login now', { hideProgressBar: true, autoClose: 2000, type: 'success' })
    window.location.href = '/login';
  } catch (error) {
    console.error('Erreur:', error);
  }

  return {
    props: {},
  };
};

export const onSignout = () => {
  const cookies = new Cookies();
  cookies.remove('token');
  window.location.href = '/login';
};

import { postRequest } from '../utils/apiUtils';
import Cookies from 'universal-cookie';
import { CreateUser, LoginUser } from '@/commons/types';
import { toast } from 'react-toastify';

const cookies = new Cookies();

export const onLogin = async (data: LoginUser) => {
  const url = '/users/login';
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const userData = await postRequest(url, data, options);
    cookies.set('token', userData.user.token, {sameSite:'strict'});
    toast('Login successfuly', { hideProgressBar: true, autoClose: 2000, type: 'success' })
    window.location.href = '/profile';
  } catch (error) {
    toast('Login failed \n Verify your email or password', { hideProgressBar: true, autoClose: 2000, type: 'error' })
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
  cookies.remove('token', {path: '/'});
  window.location.href = '/login';
};

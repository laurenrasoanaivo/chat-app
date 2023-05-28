import { getRequest, postRequest } from '../utils/apiUtils';
import Cookies from 'universal-cookie';
import { CreateUser, LoginUser, User, UserforDomain, UsertoREST } from '@/commons/types';
import { token } from '@/utils';
import { cookies } from 'next/dist/client/components/headers';

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

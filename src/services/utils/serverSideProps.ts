import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { redirect } from '../redirection';

export const serverSidePropsToProfile: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context;
  const token = req.cookies.token;

  if (token) {
    return redirect('/profile');
  }

  return {
    props: {},
  };
};

export const serverSidePropsToLogin: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { req } = context;
    const token = req.cookies.token;
  
    if (!token) {
      return redirect('/login');
    }
  
    return {
      props: {},
    };
  };

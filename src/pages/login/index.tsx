import { LoginUser } from '@/commons/types/user';
import { onLogin } from '@/services';
import { serverSidePropsToProfile } from '@/services/utils';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

export const getServerSideProps = serverSidePropsToProfile;

const loginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginUser>();

  return (
    <div className='container-fluid w-50 p-4'>
      <div className='mb-3'>
        <Link href="/sign-up">Sign up</Link>
      </div>
      <form name='loginForm' onSubmit={handleSubmit(onLogin)}>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className='text-center'>
          <button className="loginButton btn btn-primary my-2" type="submit">Login</button><br />
        </div>
      </form>
    </div>
  );
};


export default loginForm;

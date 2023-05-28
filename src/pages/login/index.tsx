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
    <>
      <Link href="/sign-up">Sign up</Link>
      <form name='loginForm' onSubmit={handleSubmit(onLogin)}>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="text"
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
        <button className="btn btn-primary" type="submit">Login</button><br />
      </form>
    </>
  );
};


export default loginForm;

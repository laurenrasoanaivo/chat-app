import { CreateUser } from '@/commons/types/user';
import { onSignup } from '@/services';
import { serverSidePropsToProfile } from '@/services/utils';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const getServerSideProps = serverSidePropsToProfile;

const registrationForm: React.FC = () => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm<CreateUser>();
  const password = watch('password', '');

  return (
    <div className='container-fluid w-50 p-4'>
    <form name='registrationForm' onSubmit={handleSubmit(onSignup)}>
      <div className='mb-4'>
      <Link href="/login">Sign in</Link>
      </div>
      <div className="mb-4">
        <input
          type='text'
          id="name"
          placeholder='Name'
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div className="mb-4">
        <input
          type="email"
          id="email"
          placeholder='email'
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div className="mb-4">
        <input
          type="password"
          id="password"
          placeholder='Password'
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div className="mb-4">
        <input
          type="password"
          id="confirmPassword"
          placeholder='Confirm Password'
          className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
          {...register('confirmPassword', { required: 'Confirm your Password', validate: (value) => value === password || 'Passwords do not match' })}
        />
        {errors.confirmPassword && (<span>{errors.confirmPassword.message}</span>)}
      </div>
      <div className='text-center my-2'>
      <button className="btn btn-primary"  type="submit">Register</button>
      </div>
    </form>
    </div>
  );
};



export default registrationForm;

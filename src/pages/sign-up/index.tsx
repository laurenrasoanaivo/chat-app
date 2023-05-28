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
    <form name='registrationForm' onSubmit={handleSubmit(onSignup)}>
      <Link href="/login">Sign in</Link>
      <div className="mb-3">
        <input
          type='text'
          id="name"
          placeholder='Name'
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <input
          type="email"
          id="email"
          placeholder='email'
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <input
          type="password"
          id="password"
          placeholder='Password'
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div>
        <input
          type="password"
          id="confirmPassword"
          placeholder='Confirm Password'
          className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
          {...register('confirmPassword', { required: 'Confirm your Password', validate: (value) => value === password || 'Passwords do not match' })}
        />
        {errors.confirmPassword && (<span>{errors.confirmPassword.message}</span>)}
      </div>
      <button className="btn btn-primary"  type="submit">Register</button>
    </form>
  );
};



export default registrationForm;

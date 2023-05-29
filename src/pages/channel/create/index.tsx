import { CreateChannel } from '@/commons/types/channel';
import { onCreateChannel } from '@/services/channelService';
import { serverSidePropsToLogin } from '@/services/utils';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

export const getServerSideProps = serverSidePropsToLogin;

const createChannelForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateChannel>();
  const {push} = useRouter();

  return (
    <div className='container-fluid w-50 text-center p-5'>
      <h3 className='mb-5'>Create Channel</h3>
    <form name='createChannelForm' onSubmit={handleSubmit(onCreateChannel)}>
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
          type="text"
          id="type"
          placeholder='Type'
          className={`form-control ${errors.type ? 'is-invalid' : ''}`}
          {...register('type', { required: 'Type is required' })}
        />
        {errors.type && <span>{errors.type.message}</span>}
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="members"
          placeholder='Members'
          className={`form-control ${errors.members ? 'is-invalid' : ''}`}
          {...register('members', { required: 'Members is required' })}
        />
        {errors.members && <span>{errors.members.message}</span>}
      </div>
      <div className='mt-5'>
      <button className="btn btn-primary mx-2" type="submit">Create</button>
      <button onClick={() => push('/channel')} className="btn btn-secondary mx-2">Annuler</button>
      </div>
    </form>
    </div>
  );
};



export default createChannelForm;

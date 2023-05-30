import { User } from '@/commons/types';
import { CreateChannel } from '@/commons/types/channel';
import { onCreateChannel } from '@/services/channelService';
import { getAllUsers } from '@/services/userService';
import { serverSidePropsToLogin } from '@/services/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from "react-select";

export const getServerSideProps = serverSidePropsToLogin;

const createChannelForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateChannel>();
  const { push } = useRouter();
  const [users, setUsers] = useState<User[]>();
  const router = useRouter();
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      const usersData = await getAllUsers();
      setUsers(usersData.props.users);
    }

    fetchData();
  }, []);

  const handleFormSubmit = handleSubmit((data) => {
    const formData = {
      ...data,
      members: selectedUsers,
    };
    onCreateChannel(formData);

    console.log("ito ilay members: " + formData);
  });

  return (
    <div className='container-fluid w-50 text-center p-5'>
      <h3 className='mb-5'>Create Channel</h3>
      <form name='createChannelForm' onSubmit={handleFormSubmit}>
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
          <select className="form-select" id="type" {...register('type', { required: 'Type is required' })}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <Select
          className='mb-4'
          id="multiple-select-field"
          isMulti
          options={users != null ? users.map((user) => ({ value: user.id, label: user.name })) : []}
          {...register('members')}
          onChange={(selectedOptions) => {
            const selectedUserIds = selectedOptions
              .map((option: any) => option.value)
              .filter((value: any) => value !== undefined) as number[];

            setSelectedUsers(selectedUserIds);
          }}
        />
        <div className='mt-5'>
          <button className="btn btn-primary mx-2" type="submit">Create</button>
          <button onClick={() => push('/channel')} className="btn btn-secondary mx-2">Annuler</button>
        </div>
      </form>
    </div>
  );
};



export default createChannelForm;

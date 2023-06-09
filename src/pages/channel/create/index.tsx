import NavigationBar from '@/commons/components/NavigationBar';
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
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateChannel>();
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

  const type = watch('type', '');

  return (
    <div className='container-fluid w-50 text-center p-5'>
      <NavigationBar/>
      <h3 className='mb-5 mt-4'>Create Channel</h3>
      <form name='createChannelForm' onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <input
            type='text'
            id="name"
            placeholder='Channel Name'
            className={`form-control ${errors.channelName ? 'is-invalid' : ''}`}
            {...register('channelName', { required: 'channel Name is required' })}
          />
          {errors.channelName && <span>{errors.channelName.message}</span>}
        </div>
        <div className="mb-4">
          <select className="form-select" id="type" {...register('type', { required: 'Type is required' })}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        {type === "private" &&
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
          />}
        <div className='mt-5'>
          <button className="btn btn-primary mx-2" type="submit">Create Channel</button>
          <button onClick={() => push('/channel')} className="createChannelButton btn btn-secondary mx-2">Annuler</button>
        </div>
      </form>
    </div>
  );
};



export default createChannelForm;

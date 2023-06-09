import NavigationBar from '@/commons/components/NavigationBar';
import { User } from '@/commons/types';
import { EditChannel } from '@/commons/types/channel';
import { onEditChannel } from '@/services/channelService';
import { getAllUsers } from '@/services/userService';
import { serverSidePropsToLogin } from '@/services/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from "react-select";

export const getServerSideProps = serverSidePropsToLogin;

const editChannelForm = () => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm<EditChannel>();
  const [users, setUsers] = useState<User[]>();
  const router = useRouter();
  const { channel_id } = router.query;
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
    onEditChannel(formData, Number(channel_id));

    console.log("ito ilay members: " + formData);
  });
  
  const type = watch('type', '');

  return (
    <div className='container-fluid w-50 text-center p-5'>
      <NavigationBar/>
      <h3 className='mb-5 mt-4'>Edit Channel</h3>
      <form name='createChannelForm' onSubmit={handleFormSubmit}>
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
          <button className="btn btn-primary mx-2" type="submit">Edit Channel</button>
          <button onClick={() => router.push('/channel')} className="editChannelButton btn btn-secondary mx-2">Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default editChannelForm;

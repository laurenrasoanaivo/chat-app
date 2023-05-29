import { User, UsertoREST } from '@/commons/types';
import { AddMembers, Channel, CreateChannel } from '@/commons/types/channel';
import { onEditChannel } from '@/services/channelService';
import { getAllUsers } from '@/services/userService';
import { serverSidePropsToLogin } from '@/services/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from "react-select";

export const getServerSideProps = serverSidePropsToLogin;

const editChannelForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AddMembers>();
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

  return (
    <div className='container-fluid p-3 '>
      <form name='editChannelForm' onSubmit={handleFormSubmit}>
        <h3 className='text-center p-3'>Select members</h3>
        <div className='hstack gap-3 p-3 p-5'>
            <Select
              className='w-100 me-auto'
              id="multiple-select-field"
              isMulti
              options={users != null ? users.map((user) => ({ value: user.id, label: user.name })) : []}
              {...register('members')}
              onChange={(selectedOptions) => {
                const selectedUserIds = selectedOptions
                  .map((option:any) => option.value)
                  .filter((value:any) => value !== undefined) as number[];

                setSelectedUsers(selectedUserIds);
              }}
            />
            <button className='btn btn-primary' type="submit">Envoyer</button>
            <div className="vr"></div>
            <button type='reset' onClick={() => router.push('/channel')} className="btn btn-outline-secondary">Annuler</button>
          </div>
      </form>
    </div>
  );
};

export default editChannelForm;

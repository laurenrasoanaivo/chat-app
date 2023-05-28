import { User } from '@/commons/types';
import { AddMembers } from '@/commons/types/channel';
import { onEditChannel } from '@/services/channelService';
import { getAllUsers } from '@/services/userService';
import { serverSidePropsToLogin } from '@/services/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const getServerSideProps = serverSidePropsToLogin;

const editChannelForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AddMembers>();
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    async function fetchData() {
      const userData = await getAllUsers();
      setUsers(userData.props.users);
    }

    fetchData();
  }, []);

  const router = useRouter();
  const { channel_id } = router.query;


  return (
    <form name='editChannelForm' onSubmit={handleSubmit((data) => onEditChannel(data, Number(channel_id)))}>
      <select multiple {...register('members')}>
        {users != null && users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default editChannelForm;

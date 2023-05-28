import { User } from '@/commons/types';
import { AddMembers, Channel, CreateChannel } from '@/commons/types/channel';
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
  const router = useRouter();
  const { channel_id } = router.query;

  useEffect(() => {
    async function fetchData() {
      const userData = await getAllUsers();
      setUsers(userData.props.users);
    }

    fetchData();
  }, []);

  return (
    <form name='editChannelForm' onSubmit={handleSubmit((data) => onEditChannel(data, Number(channel_id)))}>
      <h3>Select members</h3>
      <select multiple {...register('members')}>
        {users != null && users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select><br />
      <button className='btn btn-primary' type="submit">Envoyer</button>
      <button onClick={() => router.push('/channel')} className="btn btn-secondary">Annuler</button>
    </form>
  );
};

export default editChannelForm;

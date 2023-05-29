import NavigationBar from '@/commons/components/NavigationBar';
import { User } from '@/commons/types';
import { ChanneltoREST } from '@/commons/types/channel';
import { getChannels } from '@/services/channelService';
import { getAllUsers } from '@/services/userService';
import { serverSidePropsToLogin } from '@/services/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Stack from 'react-bootstrap/Stack';

export const getServerSideProps = serverSidePropsToLogin;

const channel = () => {
  const [channels, setChannels] = useState<[ChanneltoREST]>();
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    async function fetchData() {
      const channelsData = await getChannels();
      setChannels(channelsData.props.channels);
      const userData = await getAllUsers();
      setUsers(userData.props.users);
    }

    fetchData();
  }, []);

  return (
    <div className='container-fluid p-5 w-50'>
      <NavigationBar />
      <div className='border-bottom p-3'>
        <h3 className='mt-3 mb-3'>Direct Messages</h3>
        {users != null &&
          <Stack className='text-center' direction="horizontal" gap={3}>
            {users.map((e, i) => <button onClick={() => window.location.href = `/message/${e.id}`} key={i} className="btn btn-outline-success">{e.name}</button>)}
          </Stack>
        }
      </div>
      <div className='text-center mt-3'>
        <Link href="/channel/create">Create Channel</Link>
      </div>
      <h1>Channels</h1>
      <div>
        {
          channels != null &&
          <div className="list-group">
            {channels.map((e, i) =>
              <div className='hstack gap-3 p-1'>
                <Link href={`/channel/${e.id}`} className="list-group-item list-group-item-action rounded" key={i}>{e.name}</Link>
                <div className='text-start'>
                  <button className="btn btn-outline-secondary text-start"
                    onClick={() => window.location.href = `/channel/edit/${e.id}`}>
                    Edit</button>
                </div>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default channel;

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
    <div className='chat'>
      <NavigationBar />
      <div className='border-bottom p-3'>
        <h3>Online</h3>
        {users!=null && 
          <Stack direction="horizontal" gap={3}>
            {users.map((e, i) => <button onClick={() => window.location.href = `/message/${e.id}`} key={i} className="bg-info border p-1 text-light">{e.name}</button>)}
        </Stack>
        }
      </div>
      <Link href="/channel/create">Create Channel</Link>
      <h1>Channels</h1>
      <div>
        {
          channels != null && 
          <div className="list-group">
            {channels.map((e, i) => 
            <Link href={``} className="llist-group-item list-group-item-action" key={i}>{e.name}
              <button className="btn btn-secondary" 
                onClick={() => window.location.href = `/channel/edit/${i+1}`}>
                Edit</button>
            </Link>)}
          </div>
        }
      </div>
    </div>
  );
};

export default channel;

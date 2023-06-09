
import { getUser, } from '@/services/userService';
import { serverSidePropsToLogin } from '@/services/utils';
import { useEffect, useState } from 'react';
import EditProfilForm from '@/commons/components/EditProfilForm';
import { UsertoREST } from '@/commons/types';
import NavigationBar from '@/commons/components/NavigationBar';

export const getServerSideProps = serverSidePropsToLogin;

const profile = () => {
  const [user, setUser] = useState<UsertoREST>();

  useEffect(() => {
    async function fetchData() {
      const userData = await getUser();
      setUser(userData.props.user);
    }

    fetchData();
  }, []);


  return (
      <div id='profile' className='container-fluid w-50 mt-4 p-5'>
        <NavigationBar/>
        {user != null && <EditProfilForm user={user} />}
      </div>
  );

};

export default profile;


import { getUser, } from '@/services/userService';
import { serverSidePropsToLogin } from '@/services/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import EditProfilForm from '@/commons/components/EditProfilForm';
import { UsertoREST } from '@/commons/types';
import NavigationBar from '@/commons/components/NavigationBar';

export const getServerSideProps = serverSidePropsToLogin;


const profile = () => {
  const [user, setUser] = useState<UsertoREST>();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    async function fetchData() {
      const userData = await getUser();
      setUser(userData.props.user);
    }

    fetchData();
  }, []);


  return (
      <div id='profile' className='chat'>
        <NavigationBar/>
        <h1>Profile</h1>
        {user &&
          <div>
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <form >
                <label htmlFor="bio">Bio:</label><br></br>
                <textarea defaultValue={user.bio} /><br></br>
                <Button variant="primary" onClick={handleOpenModal}>
                  Edit
                </Button>
              </form>
            </div>
            <div>
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Profile Form</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <EditProfilForm user={user} />
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        }
      </div>
  );

};

export default profile;

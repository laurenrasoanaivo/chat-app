
import { getUser, } from '@/services/userService';
import { serverSidePropsToLogin } from '@/services/utils';
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
      <div id='profile' className='container-fluid w-50 text-center mt-4 p-5'>
        <NavigationBar/>
        <h2 className='mb-4'>Profile</h2>
        {user &&
          <div>
            <div>
              <p>Name: <span className='text-secondary'>{user.name}</span></p>
              <p>Email: <span className='text-secondary'>{user.email}</span></p>
              <form >
                <label htmlFor="bio">Bio:</label><br></br>
                <textarea className='text-secondary' defaultValue={user.bio} /><br></br>
                <Button className='mt-4' variant="primary" onClick={handleOpenModal}>
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

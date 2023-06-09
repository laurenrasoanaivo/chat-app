import { UpdateUser, UsertoREST } from "@/commons/types";
import { getRequest, putRequest, token } from "@/utils";
import { toast } from "react-toastify";

export const getUser = async () => {
    let user = null;
    
    
    const url = '/user';
    const options = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
  
    try {
      const userData = await getRequest(url, options);
      user = userData.user;
    } catch (error) {
      console.error('Erreur:', error);
    }
  
    return {
      props: {user},
    };
  };

  export const getAllUsers = async () => {
    let users = null;
    
    const url = '/users';
    const options = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
  
    try {
      const userData = await getRequest(url, options);
      users = userData.users;
    } catch (error) {
      console.error('Erreur:', error);
    }
  
    return {
      props: {users},
    };
  };

  export const getUserById = async (userId: number) => {
    let users: UsertoREST[] = [];
    let user = null;
    const usersData = await getAllUsers();
    users = usersData.props.users;

    if(users && users.length){
      for(let i=0; i<users.length; i++){
        if(users[i].id == userId){
          user = users[i];
        }
      }
    }
  
    return {
      props: {user},
    };
  };

  export const updateUser = async (data: UpdateUser) => {
    let user = null;
    
    const url = '/user';
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
  
    try {
      const userData = await putRequest(url, data, options);
      toast('Profile update successfuly', { hideProgressBar: true, autoClose: 2000, type: 'success' })
      user = userData.user;
    } catch (error) {
      console.error('Erreur:', error);
    }
  
    return {
      props: {user},
    };
  };
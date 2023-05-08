import { useEffect, useState } from 'react';

const Chat = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setUser(parsedUserData);
    }
    console.log(userDataString)
  }, []);


  return (
    <div className='chat'>
      <h1>Chat</h1>
      <div>
        <div className='bubble'>
          <p>Welcome, {user.name}!</p>
        </div>
        <div>
          <form action="">
            <input type="text" />
            <button>Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;

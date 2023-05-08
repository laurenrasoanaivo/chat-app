import React, { useState } from 'react';
import { useRouter } from 'next/router';
import './../styles/Home.module.css';

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  };

  const handleConfirmPasswors = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
  };

  const handleChangeBio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value)
  };

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    localStorage.setItem('user', JSON.stringify({ name, email, bio }));

    router.push('/Chat');
  }

  return (
    <div>
        <form className='form' onSubmit={handleSignup}>
        <br></br>
            <input type="text" value={name} onChange={handleChangeName} placeholder='Your name...' /><br></br>
            <input type="email" value={email} onChange={handleChangeEmail} placeholder='Your email...' /><br></br>
            <input type="password" value={password} onChange={handleChangePassword} placeholder='Your password...'/><br></br>
            <input type="password" value={confirmPassword} onChange={handleConfirmPasswors} placeholder='Confirm your password...'/><br></br>
            <input type="text" value={bio} onChange={handleChangeBio} placeholder='your bio...' /><br></br><br></br>
            <button type="submit">Submit</button><br></br><br></br><br></br>
        </form>
    </div>
  )
}

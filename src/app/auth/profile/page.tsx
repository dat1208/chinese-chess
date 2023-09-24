'use client'
import { Button } from '@mui/material';
import Image from 'next/image'
import * as React from 'react';
import { getUser, setUser } from '@/scripts/storage';
import { User } from '@/interfaces/userInterface';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState(
  {  _id: '',
      fullname: '',
      email: '',
      username: '', });
  

      

  React.useEffect(() => {
    // Assume fetchUserInfo is a function that fetches user information
    const fetchUserInfo = async () => {
      const userInfo : User = getUser() as User;
      setUser(userInfo);
      console.log(userInfo);
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(user);
  };
  
  return (
    
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h1 className="mt-10 mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Your Profile
      </h1>
      <div className="flex justify-center items-center">
      <Avatar sx={{ width: 80, height: 80, bgcolor: blue[700] }} alt={user.fullname} src='/'></Avatar>
    </div>
    </div>
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    </div>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              onChange={handleChange}
              value={user.username}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
            Your name
          </label>
          <div className="mt-2">
            <input
              id="fullname"
              name="fullname"
              onChange={handleChange}
              type="text"
              value={user.fullname}
              autoComplete="fullname"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              onChange={handleChange}
              type="email"
              value={user.email}
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
       
        
        {/* <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div> */}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save profile
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}
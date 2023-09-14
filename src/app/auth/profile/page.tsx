import { Button } from '@mui/material';
import Image from 'next/image'
import * as React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Your Profile
      </h1>
      <div className="flex justify-center items-center">
      <Image
      src="/profile.png"
      width={150}
      height={150}
      alt="Picture of the author"
    />
    </div>
    </div>
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    </div>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Your name
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              value="Hồ Thành Vinh"
              autoComplete="name"
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
              type="email"
              value="hovinh414@gmail.com"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
            Phone number
          </label>
          <div className="mt-2">
            <input
              id="phone"
              name="phone"
              type="text"
              value="0967626483"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value="hovinh1003"
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
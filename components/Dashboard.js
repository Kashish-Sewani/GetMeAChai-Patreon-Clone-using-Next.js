"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react";
import { fetchuser, updateProfile } from '@/actions/useractions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const Dashboard = () => {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    profilePicture: '',
    coverPicture: '',
    razorpayid: '',
    razorpaysecret: ''
  });


  useEffect(() => {
    if (status !== 'loading') {
      if (!session || !session.user || !session.user.name) {
        router.push('/login');
      } else {
        getData();
      }
    }
  }, [router, session, status]);

  const getData = async () => {
    if (session && session.user && session.user.name) {
      let u = await fetchuser(session.user.name);
      setForm({
        name: u.name || '',
        email: u.email || '',
        username: u.username || '',
        profilePicture: u.profilePicture || '',
        coverPicture: u.coverPicture || '',
        razorpayid: u.razorpayid || '',
        razorpaysecret: u.razorpaysecret || ''
      });
    }
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    let a = await updateProfile(e, session.user.name)
    toast('Profile Updated', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      {/* Same as */}
      <ToastContainer />

      <div className="container mx-auto p-3 px-6">
        <h1 className="text-3xl font-bold text-center mb-4 mt-2">Welcome to your Dashboard</h1>

        <form className="p-1 rounded-lg max-w-lg mx-auto" action={handleSubmit}>
          <div className="mb-2">
            <label className="block text-white font-bold mb-2">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              className="w-full p-1 rounded-lg bg-gray-800 text-white focus:outline-none"
            />
          </div>

          <div className="mb-2">
            <label className="block text-white font-bold mb-2">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className="w-full p-1 rounded-lg bg-gray-800 text-white focus:outline-none"
            />
          </div>

          <div className="mb-2">
            <label className="block text-white font-bold mb-2">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              className="w-full p-1 rounded-lg bg-gray-800 text-white focus:outline-none"
            />
          </div>

          <div className="mb-2">
            <label className="block text-white font-bold mb-2">Profile Picture URL</label>
            <input
              name="profilePicture"
              value={form.profilePicture}
              onChange={handleChange}
              type="text"
              className="w-full p-1 rounded-lg bg-gray-800 text-white focus:outline-none"
            />
          </div>

          <div className="mb-2">
            <label className="block text-white font-bold mb-2">Cover Picture URL</label>
            <input
              name="coverPicture"
              value={form.coverPicture}
              onChange={handleChange}
              type="text"
              className="w-full p-1 rounded-lg bg-gray-800 text-white focus:outline-none"
            />
          </div>

          {/* Input razorpay id */}
          <div className="mb-2">
            <label className="block text-white font-bold mb-2">Razorpay Id</label>
            <input
              name="razorpayid"
              value={form.razorpayid}
              onChange={handleChange}
              type="text"
              className="w-full p-1 rounded-lg bg-gray-800 text-white focus:outline-none"
            />
          </div>

          {/* Input razorpay secret */}
          <div className="mb-2">
            <label className="block text-white font-bold mb-2">Razorpay Secret</label>
            <input
              name="razorpaysecret"
              value={form.razorpaysecret}
              onChange={handleChange}
              type="text"
              className="w-full p-1 rounded-lg bg-gray-800 text-white focus:outline-none"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold mt-2 py-2 px-6 rounded-lg shadow-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;

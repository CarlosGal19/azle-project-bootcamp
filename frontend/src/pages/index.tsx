import { AuthButton, useRestActor } from "@bundly/ares-react";
import { useState } from 'react';
import ALert from '../components/Alert';
import '../app/globals.css';

export default function IcConnectPage() {
    const backend = useRestActor("backend");

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        console.log('si');
    }

    async function whoAmI() {
        try {
            const response = await backend.get("/whoami");

            console.log(response);
        } catch (error) {
            console.error({ error });
        }
    }

    return (
        <>
          <div className="text-center">
            <h1 className="text-indigo-600 font-black text-6xl my-10">Vet-Pet Manager</h1>
            <h1 className="text-indigo-600 font-black text-6xl my-10">Login and Manage your <span className="text-black">Patients</span></h1>
            <p className="font-bold text-2xl">Login with Internet Identity <AuthButton/></p>

          </div>
          <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            <form onSubmit={handleSubmit}>
              <div className="my-6">
                <label htmlFor="name" className="uppercase text-gray-600 block text-xl font-bold">Name</label>
                <input type="name" id="name" placeholder="TYpe pet name" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>
              <div className="my-6">
                <label htmlFor="owner" className="uppercase text-gray-600 block text-xl font-bold">Owner</label>
                <input type="owner" id="owner" placeholder="Type owner name" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>
              <div className="my-6">
                <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                <input type="email" id="email" placeholder="Register email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>
              <div className="my-6">
                <label htmlFor="phone" className="uppercase text-gray-600 block text-xl font-bold">Phone number</label>
                <input type="phone" id="phone" placeholder="Owner phone number" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>
              <div className="text-center">
              <input type="submit" value="Add pet" className="mx-5 bg-indigo-700 text-white font-bold rounded-xl w-full py-3 uppercase mt-5  hover:cursor-pointer hover:bg-indigo-900 md:w-auto px-16" />
              <button className=" mx-5 bg-indigo-700 text-white font-bold rounded-xl w-full py-3 uppercase mt-5  hover:cursor-pointer hover:bg-indigo-900 md:w-auto px-16" >Manage your pets</button>
              </div>
            </form>
          </div>
        </>
      )
}

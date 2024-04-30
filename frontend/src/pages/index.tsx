import { AuthButton, useRestActor } from "@bundly/ares-react";
import { useState } from 'react';
import Alert from '../components/Alert';
import '../app/globals.css';

export default function IcConnectPage() {

    const backend = useRestActor("backend");

    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [alert, setAlert] = useState<{ type: string | null; msg: string | null }>({ type: null, msg: null });

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        const values = [];
        values[0] = e.target.elements.name.value;
        values[1] = e.target.elements.owner.value;
        values[2] = e.target.elements.email.value;
        values[3] = e.target.elements.phone.value;
        if (values.includes('')) {
            setAlert({
                type: 'alert',
                msg: 'All fields are required'
            });
            return;
        }
        setAlert({ type: null, msg: null });
        const response = await backend.post("/pet", {
          id: Date.now(),
          name: values[0],
          owner: values[1],
          email: values[2],
          phone: values[3]
        },{
        headers: {
          "Content-Type": "application/json"
        }
        });
        if (response.status !== 200) {
          setAlert({
            type: 'alert',
            msg: 'An error has ocurred, try again'
          });
        return;
        }
        setAlert({
          type: 'sucess',
          msg: 'Pet added successfully'
        });
        setTimeout(() => {
          setAlert({ type: null, msg: null });
        }, 5000);
    }

    return (
        <>
          <div className="text-center">
            <h1 className="text-indigo-600 font-black text-6xl my-10">Vet-Pet Manager</h1>
            <h1 className="text-indigo-600 font-black text-6xl my-10">Login and Manage your <span className="text-black">Patients</span></h1>
            <p className="font-bold text-2xl">Login with Internet Identity <AuthButton/></p>

          </div>
          <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {
              alert && <Alert type={alert.type} msg={alert.msg} />
            }
            <form onSubmit={handleSubmit}>
              <div className="my-6">
                <label htmlFor="name" className="uppercase text-gray-600 block text-xl font-bold">Name</label>
                <input type="name" id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Type pet name" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>
              <div className="my-6">
                <label htmlFor="owner" className="uppercase text-gray-600 block text-xl font-bold">Owner</label>
                <input type="owner" id="owner" value={owner} onChange={e => setOwner(e.target.value)} placeholder="Type owner name" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>
              <div className="my-6">
                <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Type owner email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>
              <div className="my-6">
                <label htmlFor="phone" className="uppercase text-gray-600 block text-xl font-bold">Phone number</label>
                <input type="phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Owner phone number" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>
              <div className="text-center">
              <input type="submit" value="Add pet" className="mx-5 bg-indigo-700 text-white font-bold rounded-xl w-full py-3 uppercase mt-5  hover:cursor-pointer hover:bg-indigo-900 md:w-auto px-16" />
              </div>
            </form>
            <div className="text-center">
            <a href="/Pets"><button className=" mx-5 bg-indigo-700 text-white font-bold rounded-xl w-full py-3 uppercase mt-5  hover:cursor-pointer hover:bg-indigo-900 md:w-auto px-16">Manage your pets</button></a>
            </div>
          </div>
        </>
      )
}

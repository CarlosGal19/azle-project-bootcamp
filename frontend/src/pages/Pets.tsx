import { AuthButton, useRestActor } from "@bundly/ares-react";
import { useState, useEffect } from 'react';
import Alert from '../components/Alert';
import '../app/globals.css';

const Pets = () => {
    const backend = useRestActor("backend");

    const [removed, setRemoved] = useState(false);
    const [pets, setPets] = useState([]);
    const [alert, setAlert] = useState<{ type: string | null; msg: string | null }>({ type: null, msg: null });

    const handleClick = async (e: any) => {
      const response = await backend.delete(`/pet/${e.target.id}`);
      if (response.status !== 200) {
        setAlert({
          type: 'alert',
          msg: 'An error has ocurred, try again'
        });
        return;
      }
      setRemoved(true);
      setAlert({
        type: 'success',
        msg: 'Pet removed successfully'
      });
    }

   useEffect(() => {
    const fetchData = async () => {
      const response = await backend.get("/pets");
      console.log(response.status)
      if (response.status === 401) {
        setAlert({
          type: 'alert',
          msg: 'An error has ocurred, try again'
        });
        return;
      }
      setPets(response.data);
    }
    fetchData();
  }, [backend]);


    return (
        <>
          <div className="text-center">
            <h1 className="text-indigo-600 font-black text-6xl my-10">Vet-Pet Manager</h1>
            <h1 className="text-indigo-600 font-black text-6xl my-10">Login and Manage your <span className="text-black">Patients</span></h1>
            <p className="font-bold text-2xl">Login with Internet Identity <AuthButton/></p>

          </div>
          {
            alert.type && <Alert type={alert.type} msg={alert.msg}/>
          }
          <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            <ul>
              {
                pets.map((pet: any) => (
                  <li key={pet.id} className='flex justify-between items-center border-b-2 border-gray-200 py-2'>
                    <div>
                      <h1 className='text-lg font-bold'>{pet.name}</h1>
                      <p className='text-sm'>{pet.owner}</p>
                      <p className='text-sm'>{pet.email}</p>
                      <p className='text-sm'>{pet.phone}</p>
                    </div>
                    <button onClick={handleClick} className='bg-red-500 text-white px-2 py-1 rounded-lg' id={pet.id}>Remove</button>
                  </li>
                ))
              }
            </ul>
            <div className="text-center">
              <a href="/"><button className=" mx-5 bg-indigo-700 text-white font-bold rounded-xl w-full py-3 uppercase mt-5  hover:cursor-pointer hover:bg-indigo-900 md:w-auto px-16">Add pet</button></a>
            </div>
          </div>
        </>
      )
}

export default Pets

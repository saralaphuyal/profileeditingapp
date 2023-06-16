"use client";
import Nav from "./Nav/Nav";
import React, { useEffect, useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import EditProfile from './Editprofile';
import Link from "next/link";

// interface DataItem {
//   id: string;
//   name: string;
//   location: string;
//   bio: string;
//   profession: string;
// profileimg:string;

// }
export default function Home() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Team'));
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          profileimg: doc.data().profileimg,
          ...doc.data(),
        }));
        setData(documents);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleUpdate = async (updatedItem) => {
    try {
      const itemRef = doc(db, 'Team', updatedItem.id);
      await updateDoc(itemRef, updatedItem);

      const updatedData = data.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      );
      setData(updatedData);
    } catch (error) {
      console.log('Error updating data: ', error);
    }

    setSelectedItem(null);
    setIsPopupOpen(false);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
    setIsPopupOpen(false);
  };

  const handleDelete = async (item) => {
    try {
      const itemRef = doc(db, 'Team', item.id);
      await deleteDoc(itemRef);

      const updatedData = data.filter((dataItem) => dataItem.id !== item.id);
      setData(updatedData);
    } catch (error) {
      console.log('Error deleting data: ', error);
    }
  };

  return (
    <main >
 <Nav/>
 <div className="mt-28">
  
    <div className="grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4 w-11/12 m-auto z-0">
    {data.map((item) => (
      <div
        key={item.id}
        className="bg-white drop-shadow-lg rounded-3xl my-[1rem] p-10 relative group"
      >
        <div className="bg-white p-6 rounded-t-3xl rounded-bl-3xl border border-[#9867c5]">
          {/* <Link href={`profile/${item.name}/${item.id}`}>
          <img src={item.profileimg} />
          </Link> */}
            <img src={item.profileimg} />
          <div className="text-center">
            <h2 className="text-center font-bold capitalize">{item.name}</h2>
            <p className="capitalize">{item.bio}</p>
            <p className="uppercase font-semibold">{item.profession}</p>
            <p className="capitalize">{item.location}</p>
          </div>
          
          <div className="absolute top-2 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  <FiEdit className="text-[#9867c5] hover:text-gray-500 cursor-pointer text-2xl" onClick={() => handleEdit(item)} />
  <FiTrash2 className="text-[#9867c5] hover:text-gray-500 cursor-pointer text-2xl" onClick={() => handleDelete(item)} />
</div>

        </div>
      </div>
    ))}
  </div>
  {selectedItem && (
        <EditProfile selectedItem={selectedItem} handleUpdate={handleUpdate} 
        handleClose={handleClosePopup}
        />
      )}
    </div>
    </main>
  )
}

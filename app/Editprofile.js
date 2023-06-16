"use client";
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';



export default function EditProfile({ selectedItem, handleUpdate, handleClose }) {
  const [updatedItem, setUpdatedItem] = useState(selectedItem);

  const handleChange = (e) => {
    setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedItem);
  };

  return (
    <div className='relative'>
      <div className="modal fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-content bg-white w-7/12 m-auto p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="block mb-2 font-bold">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={updatedItem.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            />

            <label htmlFor="bio" className="block mb-2 font-bold">
              Bio
            </label>
            <textarea
              name="bio"
              value={updatedItem.bio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            />

            <label htmlFor="profession" className="block mb-2 font-bold">
              Profession
            </label>
            <input
              type="text"
              name="profession"
              value={updatedItem.profession}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            />

            <label htmlFor="location" className="block mb-2 font-bold">
              Address
            </label>
            <input
              type="text"
              name="location"
              value={updatedItem.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            />

            <button
              type="submit"
              className="border-2 border-[#9867c5] border-solid text-black py-1 px-4 rounded-md"
            >
              Update
            </button>

            <button className="border-2 border-red-500 border-solid py-1 md:px-6 px-3 m-2 rounded-md" onClick={handleClose}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

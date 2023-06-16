"use client";
import Nav from "../Nav/Nav";
import React, { useState, ChangeEvent } from 'react';
import { showToast } from "../Toast";
import { db, storage } from "../firebase";
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useRouter } from 'next/navigation';

export default function Add() {
  const router = useRouter();

  const initialState = {
    name: "",
    bio: "",
    profileimg: null ,
    location: "",
    profession: ""
  };
  const [state, setState] = useState(initialState);
  const { name, profileimg, location, bio, profession } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    console.log(file);
    setState({ ...state, profileimg: file });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location || !bio || !profileimg || !profession) {
      showToast("All fields are required", "error");
      return;
    }

    try {
      // Create a new document in the "Team" collection
      const docRef = await addDoc(collection(db, "Team"), {
        name: name,
        bio: bio,
        location: location,
        profession: profession,
      });

      // Check if a file is selected
      if (profileimg) {
        // Create a storage reference with a unique file name
        const storageRef = ref(storage, `profilePictures/${docRef.id}-${profileimg.name}`);

        // Convert the file to a data URL or Blob
        const reader = new FileReader();
        reader.onload = async (event) => {
          const fileDataUrl = event.target.result;

          // Upload the data URL or Blob to Firebase Storage
          await uploadString(storageRef, fileDataUrl, 'data_url');

          // Get the download URL of the uploaded file
          const downloadURL = await getDownloadURL(storageRef);

          // Update the document with the profile picture URL
          await updateDoc(doc(db, "Team", docRef.id), {
            profileimg: downloadURL,
          });
        };
        reader.readAsDataURL(profileimg);
      }

      // Clear the form inputs
      setState(initialState);
      setTimeout(() => {
        router.push('/');
      }, 1000);
      // Show success message
      showToast("Data added successfully!", "success");
    } catch (error) {
      // Show error message
      showToast(`Error adding data ${error}`, "error");
    }
  };


  return (
    <div>
      <Nav />
      <div className=' my-28 p-6 flex justify-center border-2  border-[#9867c5] border-solid md:w-3/6 sm:w-10/12 xs:w-11/12 m-auto w-3/4 rounded-lg  '>
        <div className='text-center'>
          <form onSubmit={handleSubmit} >
            <h1 className='font-bold mb-10'>ADD DATA</h1>

            <input
              type="file"
              id="file"
              name="profileimg"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="file" className="flex justify-center align-center gap-6">
              <img src='/profile.png' className="w-20 h-20 " />
              <span className="mt-6">Select Profile Picture</span>
            </label>
            {profileimg && (
              <img src={URL.createObjectURL(profileimg)} alt="Profile Preview" className="h-20 w-20" />
            )}

            <div className=''>Name</div>
            <input
              className="border-2 border-[#9867c5] border-solid py-1 md:px-14 sm:px-10 xs:px-0 px-8 m-4 rounded-md "
              type="text"
              placeholder="Name ..."
              name="name"
              value={name}
              onChange={handleInputChange} />

            <div>Bio</div>

            <input
              className="border-2 border-[#9867c5] border-solid py-1 md:px-14 sm:px-10 xs:px-0 px-8 m-4 rounded-md"
              type="text"
              placeholder="Bio ..."
              name="bio"
              value={bio}
              onChange={handleInputChange} />


            <div>profession</div>

            <input
              className="border-2 border-[#9867c5] border-solid py-1 md:px-14 sm:px-10 xs:px-0 px-8 m-4 rounded-md"
              type="text"
              placeholder="profession ..."
              name="profession"
              value={profession}
              onChange={handleInputChange} />









            <div>Address</div>
            <input
              className="border-2 border-[#9867c5] border-solid py-1 md:px-14 sm:px-10 xs:px-0 px-8 m-4 rounded-md"
              type="text"
              placeholder="location ..."
              name="location"
              value={location}
              onChange={handleInputChange}
            />



            <br></br>
            <button className="border-2  border-[#9867c5] px-6 py-2 mx-20 my-4 text-center rounded-md">Submit</button>


          </form>
        </div>

      </div>
    </div>
  )
}

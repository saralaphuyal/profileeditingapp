"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'Team', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('Profile not found');
        }
      } catch (error) {
        console.log('Error fetching profile: ', error);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={profile.profileimg} alt="Profile Image" />
      <h2>{profile.name}</h2>
      <p>{profile.bio}</p>
    </div>
  );
}

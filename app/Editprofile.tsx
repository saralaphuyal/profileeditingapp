import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface SelectedItem {
  name: string;
  bio: string;
  profession: string;
  location: string;
}

interface EditProfileProps {
  selectedItem: SelectedItem;
  handleUpdate: (updatedItem: SelectedItem) => void;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
}

export default function EditProfile({ selectedItem, handleUpdate, handleClose }: EditProfileProps) {
  const [updatedItem, setUpdatedItem] = useState<SelectedItem>(selectedItem);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate(updatedItem);
  };

  return (
    <div className="relative">
      <div className="modal fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-content bg-white w-7/12 m-auto p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <button type="submit" className="border-2 border-[#9867c5] border-solid text-black py-1 px-4 rounded-md">
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

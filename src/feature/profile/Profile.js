import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { FiSmartphone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { PiAddressBookThin } from "react-icons/pi";
import Loader from '../../components/Loader/Loader';
import { errorClean, updateStudentProfile } from '../../state/reducers/auth/authSlice';
import { showSuccessToast } from '../../components/Toast/Toast';
const Profile = () => {
    const dispatch = useDispatch();
    const { user, isLoading, updatedStudent } = useSelector(state => state.user);
    const { token } = useSelector(state => state.user.user);
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const updateProfileDataChange = e => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0]);
            }
        };
        reader.readAsDataURL(e.target.files[0]);

    };
    // Call API to update profile settings changes
    const handleUpdateProfile = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('shopLogo', avatar);
        dispatch(updateStudentProfile({ token, data: formData }));
    };
    useEffect(() => {

        if (updatedStudent) {
            showSuccessToast("Profile Successfully Updated");
            dispatch(errorClean());
        }
    }, [updatedStudent, dispatch]);
    return (
        <div className="mt-12 md:mt-20 w-2/4 md:w-3/4 2xl:w-2/4 mx-auto md:flex justify-center items-center gap-4 2xl:gap-8">
            <div className="md:w-3/4  mx-auto">

                {
                    isLoading ? <div className="flex flex-1 justify-center items-center mt-16">
                        <Loader></Loader>
                    </div> :
                        <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                            <div className="image-section  flex flex-1 items-center justify-center gap-2">
                                <img
                                    alt=""
                                    src={user.profilePic}
                                    // sx={{ width: 156, height: 156 }}
                                    className="object-cover object-center w-full h-56"
                                />

                            </div>
                            <div className="px-6 py-4">
                                <div className="flex justify-center gap-4">
                                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{user?.name}</h1>
                                    <p className="text-start text-md text-gray-500 flex items-center gap-2 "> <span> <FaCoins className="text-orange-500"></FaCoins> </span> ({user?.coin})</p>
                                </div>

                                <p className="text-start text-md text-gray-500 flex items-center gap-4 mt-4"> <span> <FiSmartphone></FiSmartphone> </span> {user?.phone}</p>
                                <p className="text-start text-md text-gray-500 flex items-center gap-4 mt-4"> <span> <AiOutlineMail></AiOutlineMail> </span> {user?.email}</p>

                                <p className="text-start text-md text-gray-500 flex items-center gap-4 mt-4 mb-8"> <span> <PiAddressBookThin></PiAddressBookThin> </span> {user?.address}</p>

                            </div>
                        </div>
                }
            </div>
            <form className="border rounded-lg p-12 w-full mt-8 md:mt-0" onSubmit={handleUpdateProfile}>
                <p className='text-2xl text-gray-700 text-start'>Update Profile</p>

                <div className="image-section  flex flex-1 items-center justify-center gap-2">
                    <img
                        alt=""
                        src={avatarPreview}
                        sx={{ width: 156, height: 156 }}
                        className="h-52 w-52 border-2 border-blue-500 rounded-full p-2"
                    />
                    <label>
                        +
                        <br />
                        <input
                            type="file"
                            name="shopLogo"
                            multiple
                            onChange={updateProfileDataChange}
                            accept="image/png,image/jpeg,image/webp"
                        />
                    </label>
                </div>
                <div className="mt-10">
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        onChange={e => setName(e.target.value)}
                        className='w-full'
                    />
                </div>
                <div className="mt-10">
                    <TextField
                        required
                        id="outlined-required"
                        label="Phone"
                        onChange={e => setPhone(e.target.value)}
                        className='w-full'
                    />

                </div>
                <div className="mt-10">
                    <TextField
                        required
                        id="outlined-required"
                        label="Address"
                        onChange={e => setAddress(e.target.value)}
                        className='w-full'
                    />
                </div>
                <div className="mt-8 w-full mx-auto">
                    <Button
                        type="submit"
                        variant="contained"
                        className='w-full h-10'
                    >
                        {" "}
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
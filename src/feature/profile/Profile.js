import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Profile.css'
import { useSelector } from 'react-redux';
import { FiSmartphone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { PiAddressBookThin } from "react-icons/pi";
import Loader from '../../components/Loader/Loader';
const Profile = () => {
    const { user, isLoading } = useSelector(state => state.user);
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");




    return (
        <div className="mt-12 md:mt-20 w-2/4 md:w-3/4 mx-auto md:flex justify-center items-center gap-4">
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
                                <label>
                                    +
                                    <br />
                                    <input
                                        type="file"
                                        name="shopLogo"
                                        multiple
                                        // onChange={updateProfileDataChange}
                                        accept="image/png,image/jpeg,image/webp"
                                    />
                                </label>
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
            <form className="border rounded-lg p-12 w-full mt-8 md:mt-0" >
                <p className='text-2xl text-gray-700 text-start'>Update Profile</p>
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
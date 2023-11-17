import { Button, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className=" flex flex-col items-center justify-center mt-12 lg:mt-52">
            <form action="" className="space-y-6 py-6 mt-6 border rounded p-4 shadow-sm" >
            <p className="text-2xl text-start">Register</p>
                <TextField id="outlined-basic" label="Email" variant="outlined" className="w-full py-3 px-6" />
                <TextField id="outlined-basic" label="Password" variant="outlined" className="w-full py-3 px-6" />
                <Button variant="contained" className="w-full py-3 px-6 h-12" >Register</Button>
                <p className="text-center text-gray-900 mt-4">Already have an account ? <span className="text-blue-500"> <Link to="/login">

                    Login</Link></span></p>
            </form>
        </div>
    );
};

export default Register;
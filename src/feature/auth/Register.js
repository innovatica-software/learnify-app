import { Button, TextField, } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createUserRegister, registrationClean } from '../../state/reducers/auth/registerSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
    const dispatch = useDispatch();
    const {
        isLoading,
        success,
        error,
        errMsg:errorMessage
    } = useSelector(state => state.register);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [language, setLanguage] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrorMessage] = useState("");
    const isValidEmail = email => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };
    const submitForm = e => {
        e.preventDefault();
        setErrorMessage("");
        const data = { name, email, address, role: "student", password, phone, language }
        if (name === "" || language === "" || phone === "") {
            setErrorMessage(
                "name, phone and language required fields."
            );
        } else if (email === "" || password === "") {
            setErrorMessage("Email and password are required fields.");
        } else if (!isValidEmail(email)) {
            setErrorMessage("Invalid email address format.");
        } else {
            dispatch(createUserRegister(data));
        }
    };
    useEffect(() => {
        if (success) {
            toast.success("Account Created Successfully", {
                position: toast.POSITION.TOP_RIGHT
            });
            const timer = setTimeout(() => {
                dispatch(registrationClean());
                navigate("/login");
            }, 2000);
            return () => clearTimeout(timer);
        }

        if (error) {
            toast.error(errMsg, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(registrationClean());
        }
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 2000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [success, error, errMsg, navigate, dispatch, errorMessage]);
    return (
        <div className=" w-3/4 lg:w-2/4 xl:w-1/4 mx-auto flex flex-col items-center justify-center mt-12 lg:mt-52">
            <form action="" className="space-y-6 py-6 mt-6 border rounded p-8 shadow-md" >
                <p className="text-2xl text-center text-blue-500">Register</p>
                <TextField id="outlined-basic" label="Name" variant="outlined" className="w-full py-3 px-6"
                    value={name} onChange={(e) => setName(e.target.value)} />
                <TextField id="outlined-basic" label="Phone" variant="outlined" className="w-full py-3 px-6"
                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                <TextField id="outlined-basic" label="Address" variant="outlined" className="w-full py-3 px-6"
                    value={address} onChange={(e) => setAddress(e.target.value)} />

                <select name="Gender" className="w-full h-12 border rounded p-2" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option  >Select Language </option>
                    <option  >Bangla  </option>
                    <option >English </option>
                    <option >Hindhi </option>
                    <option >French</option>
                </select>
                <TextField id="outlined-basic" label="Email" variant="outlined" className="w-full py-3 px-6"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField id="outlined-basic" label="Password" variant="outlined" className="w-full py-3 px-6"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" className=" w-full py-3 px-6 h-12" onClick={submitForm}>Register</Button>
                <p className="text-center text-gray-900 mt-4">Already have an account ? <span className="text-blue-500"> <Link to="/login">
                    Login</Link></span></p>
            </form>
        </div>
    );
};

export default Register;
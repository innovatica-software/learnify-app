import React, { useEffect, useState } from "react";
import "./Country.css";
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../state/reducers/country/countrySlice";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
const CountryList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);
    const { isLoading, countries } = useSelector((state) => state.countries);
    const { user } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const [textValue, setTextValue] = useState("");
    const [agree, setAgree] = useState(false);
  console.log(agree);
    const [files, setFiles] = useState("");

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log("e.target.result", e.target.result);
            setFiles(e.target.result);
        };
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleTextFieldChange = (e) => {
        setTextValue(e.target.value);
    };


    const handleSubmit = () => {
        handleClose();
    };
    return (
        <div className="country-section min-h-screen">
            <div className="lg:flex justify-center items-center gap-16 w-3/4 mx-auto pt-12 md:pt-20">
                <div className="w-full ">
                    <h1 className="text-xl lg:text-1xl xl:text-3xl text-center">
                        Challenge Your Knowledge: Dive into Our Quizzes tailored for Every
                        Country!
                    </h1>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Create New Quiz</DialogTitle>
                        <DialogContent dividers>


                            <select name="Gender" className="w-full h-12 border rounded mt-4" >
                                {
                                    countries.map((country) =>
                                        (<option >{country.name} </option>))
                                }

                            </select>

                            <TextField
                                label="Label "
                                variant="outlined"
                                value={textValue}
                                onChange={handleTextFieldChange}
                                fullWidth
                                margin="normal"

                            />
                        
                             <input type="file" onChange={handleChange} className="mt-4"/>
                                
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center">
                                    <input
                                        id="agree"
                                        name="agree"
                                        type="checkbox"
                                        className="h-4 w-4 text-violet-700 focus:ring-violet-700 border-gray-300 "
                                        checked={agree}
                                        onChange={(e) => setAgree(e.target.checked)}
                                        required
                                    />
                                    <label
                                        htmlFor="accept-terms"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        is Premirum ?
                                    </label>
                                </div>
                            </div>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} variant="contained" color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {
                        user?.role === "admin" ? <div className="w-2/4  mt-8">
                            <button onClick={handleClickOpen} className="bg-white h-12 w-36 text-gray-900 md:ml-36 border rounded font-semibold hover:border-gray-900">Add Quiz</button>
                        </div> : null
                    }

                    {isLoading ? (
                        <div className="w-1/4 mx-auto mt-12">
                            <Loader></Loader>
                        </div>
                    ) : (
                        <div className="mt-8 grid grid-cols-2 gap-4 md:w-2/4 mx-auto">
                            {countries.map((country) => (
                                <Link
                                    to={`/country/${country.countryId}`}
                                    key={country.countryId}
                                    className="country-card mt-4 w-full border"
                                >
                                    <img
                                        src={country.flag}
                                        alt={country.language}
                                        className="h-6 w-6 rounded-full"
                                    />
                                    <h3 className="font-bold">{country.language}</h3>
                                </Link>
                            ))}

                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CountryList;


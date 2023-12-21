import React, { useEffect, useState } from "react";
import "./Country.css";
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
import { submitCountryLevel, submitQuizClean } from "../../state/reducers/country/countryLevelQuizSlice";
import { showSuccessToast } from "../../components/Toast/Toast";
const CountryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
  const { isLoading, countries } = useSelector((state) => state.countries);
  const { user } = useSelector((state) => state.user);
  const { isLoading: submitLoading, success } = useSelector(
    (state) => state.countryQuiz
  );
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [name, setName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [labelName, setlabelName] = useState("");
  const [coin, setCoin] = useState("");
  const [agree, setAgree] = useState(false);
  const [files, setFiles] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const jsonData = JSON.parse(e.target.result);
      setQuestions(jsonData);
      setFiles(e.target.result);
    };
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setCountryId(e.target.value);
  };
  const handleLabelChange = (e) => {
    setlabelName(e.target.value);
  };
  const handleCoinChange = (e) => {
    setCoin(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      countryId: countryId || countries[0].countryId,
      levelName: labelName,
      point: coin,
      isUnlock: agree,
      questionList: questions,
    };
    dispatch(submitCountryLevel({ token: user.token, data }));
    console.log(data);
    handleClose();
  };
  useEffect(() => {
    if (success) {
      showSuccessToast("Quiz Uploaded Successfully");
      dispatch(submitQuizClean())
    }
  }, [dispatch, success]);
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
              <select
                className="w-full p-2 h-12 border rounded mt-4"
                value={name}
                onChange={handleNameChange}
              >
                {countries.map((country) => (
                  <option key={country.countryId} value={country.countryId}>
                    {country.language}{" "}
                  </option>
                ))}
              </select>

              <TextField
                label="Label Name"
                variant="outlined"
                value={labelName}
                onChange={handleLabelChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Point"
                variant="outlined"
                value={coin}
                onChange={handleCoinChange}
                fullWidth
                margin="normal"
              />

              <input type="file" onChange={handleChange} className="mt-6" />

              <div className="flex items-center justify-between mt-6">
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
                    className="ml-2 block text-xl text-gray-900"
                  >
                    is Unlocked?
                  </label>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {user?.role === "admin" ? (
            <div className="w-2/4  mt-8">
              <button
                onClick={handleClickOpen}
                className="bg-white h-12 w-36 text-gray-900 md:ml-36 border rounded font-semibold hover:border-gray-900"
              >
                Add Quiz
              </button>
            </div>
          ) : null}

          {isLoading || submitLoading ? (
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

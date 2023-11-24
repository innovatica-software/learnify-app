import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { newFormatDate } from '../../utilities/helper';
import { Avatar, Button, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Loader from '../../components/Loader/Loader';
import { fetchDiscussionDetails } from '../../state/reducers/discussion/discussionDetailsSlice';

const DiscussionDetails = () => {
    const dispatch = useDispatch();
    const { discussionId } = useParams();
    console.log("id",discussionId);
    useEffect(() => {
        dispatch(fetchDiscussionDetails(discussionId))
    }, [dispatch, discussionId]);
    const { isLoading, data } = useSelector((state) => state.discussion.discussion);
    const { isAuthenticated } = useSelector((state) => state.user);
    return (
        <div className="w-3/4 md:w-2/4 mx-auto mt-12">
            {
                isLoading ? <div className="flex flex-1 justify-center items-center mt-16">
                    <Loader></Loader>
                </div> : <div>
                    <Link to="/discussion">
                        <p className="text-blue-500 text-start text-sm flex items-center mt-4"> <MdKeyboardArrowLeft className="text-xl" /> Back to discussion</p></Link>
                    <p className='text-start text-xs text-gray-500 mt-4'> {newFormatDate(data?.createdAt)}</p>
                    <p className='text-start text-xl text-gray-900 mt-4'> {data?.title}</p>
                    <div className="flex items-center mt-8">
                        <div className="flex-shrink-0 object-cover w-10 h-10 rounded-full ring-2 ring-gray-300">
                            {data?.discussionAuthor?.image ? (
                                <Avatar alt="Profile Image" src={data?.discussionAuthor?.image} />
                            ) : (
                                <AccountCircle style={{ width: 40, height: 40 }} />
                            )}
                        </div>
                        <div className="ml-2">
                            <h1 className="text-sm text-start font-semibold text-gray-700 capitalize mt-2">
                                {data?.discussionAuthor?.name}
                            </h1>
                        </div>
                    </div>
                    <p className='text-start text-xl text-gray-900 mt-8'> {data?.description}</p>
                    <div>
                        {
                            data?.comments.map(cmnt => (
                                <div className='mt-12 border p-4 rounded-lg'>
                                    <p className="text-start">{cmnt.comment}</p>
                                    <div className="flex items-center mt-8">
                                        <div className="flex-shrink-0 object-cover w-10 h-10 rounded-full ring-2 ring-gray-300">
                                            {cmnt?.studentInfo?.profilePic ? (
                                                <Avatar alt="Profile Image" src={cmnt?.studentInfo?.profilePic} />
                                            ) : (
                                                <AccountCircle style={{ width: 40, height: 40 }} />
                                            )}
                                        </div>
                                        <div className="ml-2">
                                            <h1 className="text-sm text-start font-semibold text-gray-700 capitalize mt-2">
                                                {cmnt?.studentInfo?.name}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {isAuthenticated ? <div className="w-full flex  mt-8">

                        <TextField id="standard-basic" label="Give Comment" variant="standard" className='w-full' />
                        <Button variant="contained">Send</Button>
                    </div> : null}


                </div>
            }
        </div>
    );
};

export default DiscussionDetails;
import React, { useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import uploadImage from '../../utils/uploadImage'


const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!fullName) {
            setError("Please Enter your name!");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email!");
            return;
        }
        if (!password) {
            setError("Please enter a password");
            return
        }

        setError("");

        // Sign Up Api Call
        try {

            let profileImgUrl = "";
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImgUrl = imgUploadRes.imageUrl || "";
            }


            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImgUrl
            });
            const { token, user } = response.data;
            if (token) {
            }
            localStorage.setItem("token", token);
            updateUser(user);
            navigate("/dashboard");
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    }


    return (
        <AuthLayout>
            <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below.</p>

                <form onSubmit={handleSignUp}>

                    <ProfilePhotoSelector image={profilePic} setProfilePic={setProfilePic} />

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            label="Full Name"
                            placeholder="Jhon"
                            type="text"
                        />
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label='Enter Your Email'
                            placeholder='john@example.com'
                            type='text'
                        />
                        <div className='col-span-2'>
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label='Password'
                                placeholder='Min 8 Characters'
                                type='password'
                            />
                        </div>
                        {error && <p className='text-xs text-red-500 pb-2.5'>{error}</p>}
                    </div>

                    <button type='submit' className='btn-primary cursor-pointer'>
                        Sign Up
                    </button>
                    <p className='text-[13px] text-slate-800 mt-3'>
                        Already have an accound?{' '}
                        <Link to='/login' className='font-medium text-primary underline'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default SignUp

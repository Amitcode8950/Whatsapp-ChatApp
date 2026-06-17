import React from 'react'
import {useForm} from 'react-hook-form'
const Singup = () => {
    const {register, handleSubmit, watch, formState: {
            errors
        }} = useForm()
    const validatePAsswordmatch = (value) => {
        return value === password || "Password does not match";
    }


    const onSubmit = (data) => console.log(data)

    return (
        <>
            <div className='bg-black h-screen w-screen flex items-center justify-center gap-10 p-10'>
                <form onSubmit={
                        handleSubmit(onSubmit)
                    }
                    action=""
                    className="w-[400px] h-[500px] mx-auto p-4 flex flex-col justify-center  gap-5 px-6 py-2 rounded-md text-white border">
                    <h1 className='text-3xl font-bold'>Text
                        <span className='text-green-600'>
                            Application</span>
                    </h1>
                    <h2 className='text-xl font-bold text-white-600'>Signup</h2>
                    <label class="input validator">
                        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </g>
                        </svg>
                        <input {...register("fullname", { required: true })} type="text" required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash"/>
                    </label>
                    {
                    errors.fullname && <span className='text-red-500 text-sm'>This field is required</span>
                }

                    <label class="input validator">
                        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input {...register("email", { required: true })} type="email" placeholder="mail@site.com" required/>
                    </label>
                    {
                    errors.email && <span className='text-red-500 text-sm'>This field is required</span>
                }

                    <label class="input validator">
                        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input {...register("password", { required: true })} type="password" required placeholder="Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"/>
                    </label>
                    {
                    errors.password && <span className='text-red-500 text-sm'>This field is required</span>
                }

                    <label class="input validator">
                        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input type="confirmpassword" {...register("confirmpassword", { required: true , validate: validatePAsswordmatch })} required placeholder="confirm-Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"/>
                    </label>
                    {
                    errors.confirmpassword && <span className='text-red-500 text-sm'>This field is required</span>
                }
                    <div className='flex flex-col gap-3 w-full'>
                        <p>Have an account?
                            <a href="" className='text-blue-500'>Login</a>
                        </p>
                        <input type="submit" value="Signup" className='w-full  bg-green-500 text-white font-bold py-2 px-4 rounded'/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Singup

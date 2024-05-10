import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem('passwords')
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const savePassword = () => {
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        console.log(passwordArray)
    }
    const deletePassword = (id) => {

        toast('password deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        setpasswordArray(passwordArray.filter(item => item.id != id))
        localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item => item.id != id)))
    }
    const showPass = () => {
        alert("show the password")
        if (ref.current.src.includes('icons/eyecross.png')) {
            ref.current.src = 'icons/eye1.png'

        }
        else {
            ref.current.src = 'icons/eyecross.png'
        }
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            <div className="  p-2 md:p-0 md:mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    <span>Pass</span><span className='text-green-700'>OP/&gt;</span>
                </h1>
                <p className='text-green-700 text-lg text-center gap-8'>Set your own Password</p>
                <div className=" flex flex-col  p-4 gap-8 ml-40 mr-40">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className="rounded-full border border-green-700 w-full px-2 py-1" type="text" name='site' />
                    <div className="flex  flex-col md:flex-row w-full gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className="rounded-full border border-green-500 w-full px-4 py-1" type="text" name='username' />
                        <div className="relative">
                            <input value={form.password} onChange={handleChange} placeholder='Enter Password' className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name='password' />
                            <span className='absolute right-1 top-1 cursor-pointer ' onClick={showPass}>
                                <img ref={ref} width={25} src="icons/eye1.png" alt="" />
                            </span>

                        </div>




                    </div>
                    <div className='flex justify-center items-center'>
                        <button onClick={savePassword} className='flex justify-center items-center bg-green-500 rounded-full px-2 py-2 w-fit hover:bg-green-300 gap-3'>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover">
                            </lord-icon>
                            Add Password</button>

                    </div>



                </div>
                <div className="passwords">
                    <h2 className='text-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Password to show</div>}
                    {passwordArray.length != 0 &&
                        <table class="table-auto w-full">
                            <thead className='bg-green-700 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>password</th>
                                    <th className='py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 text-center w-32'>{item.site}</td>
                                        <td className='py-2 text-center w-32'>{item.username}</td>
                                        <td className='py-2 text-center w-32'>{item.password}</td>
                                        <td className='my-2 text-center w-32 '>

                                            <span className="cursor-pointer" onClick={() => { deletePassword(item.id) }}>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>

                                        </td>
                                    </tr>
                                })}


                            </tbody>
                        </table>}
                </div>
            </div>

        </>
    );
}

export default Manager;

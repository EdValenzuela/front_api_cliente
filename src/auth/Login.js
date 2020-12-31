import React, { useContext, useState, useEffect } from 'react';
import clienteAxios from '../components/config/axios';
import { Link, withRouter } from 'react-router-dom';

import { MyAuthContext } from '../context/AuthContext';

import Swal from 'sweetalert2';

const Login = ({history}) => {
    
    const [auth, saveToken] = useContext(MyAuthContext);

    const [authUser, saveAuthUser] = useState({
        email:'',
        password:''
    });

    useEffect( () => { 
        const token = localStorage.getItem('token'); 
        if(token){ saveToken({ token, auth: true }); 
        history.push('/');
        } 
    },[]);

    const handleSubmit = async e => {
        e.preventDefault();

        if(!authUser.email || !authUser.password){
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Completa los campos'
            })
            return;
        }

        try {
            const res = await clienteAxios.post('/iniciar-sesion', authUser);
            const { token } = res.data;
            localStorage.setItem('token', token);

            saveToken({
                token,
                auth: true
            })

            Swal.fire(
                'Login Correcto',
                'Has iniciado sesión',
                'success'
            )
            history.push('/');

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: error.response.data.message
            })
        }
    }

    const handleChange = e => {
        saveAuthUser({
            ...authUser,
            [e.target.name] : e.target.value
        });
    }

    return (
        <>
            <h1 className="text-3xl text-center font-bold uppercase p-10">Login</h1>
            <form onSubmit={handleSubmit} className="lg:w-2/6 md:w-1/2 mx-auto bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
                <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                    <input type="email" onChange={handleChange} id="email" name="email" placeholder="correo@correo.com" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                <div className="relative mb-4">
                    <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                    <input type="password" onChange={handleChange} id="password" name="password" placeholder="Password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                <input type="submit" value="Iniciar sesión" className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-700 rounded text-lg text-center cursor-pointer"/>
                <Link 
                    to={'/registrar-usuario'}
                    className="mt-4 text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg text-center cursor-pointer"
                >Crear cuenta nueva ?</Link>
            </form>
        </>
    )
}

export default withRouter(Login);

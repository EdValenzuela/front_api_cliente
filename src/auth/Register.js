import React, { useState } from 'react';
import clienteAxios from '../components/config/axios';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = ({history}) => {

    const [registerUser, saveRegisterUser] = useState({
        email: '',
        nombre: '',
        password: ''
    });

    const handleChange = e =>{
        saveRegisterUser({
            ...registerUser,
            [e.target.name]: e.target.value
        })
    }

    // const validatedClient = () =>{
    //     const {nombre, apellido, profesion, email, telefono} = newClient;
    //     const valido = !nombre.length || !apellido.length || !profesion.length 
    //                 || !email.length || !telefono.length;
    //     return valido;
    // }

    const handleSubmit = e =>{
        e.preventDefault();

        if(!registerUser.email || !registerUser.nombre || !registerUser.password){
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Completa los campos'
            })
            return;
        }
        
        clienteAxios.post('/crear-cuenta', registerUser)
            .then(res => {
                if(res.data.code === 11000){
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'Este usuario ya está registrado'
                    })
                }else{
                    Swal.fire(
                        'Usuario registrado',
                        res.data.message,
                        'success'
                    )
                }
                history.push('/');
            });  
    }

    return (
        <>
            <h1 className="text-3xl text-center font-bold uppercase p-10">Nuevo Usuario</h1>

            <form onSubmit={handleSubmit} className="w-full sm:w-1/2 bg-white flex flex-col mx-auto">
                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Datos del usuario</h2>
                <p className="leading-relaxed mb-5 text-gray-600">Completa todos los campos</p>
                <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                    <input type="email" onChange={handleChange} id="email" placeholder="correo@correo.com" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>

                <div className="relative mb-4">
                    <label htmlFor="nombre" className="leading-7 text-sm text-gray-600">Nombre</label>
                    <input type="text" onChange={handleChange} id="nombre" placeholder="Nombre usuario" name="nombre" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                
                <div className="relative mb-4">
                    <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                    <input type="password" onChange={handleChange} id="password" placeholder="Password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                <input type="submit" value="registrar usuario" className='text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg uppercase cursor-pointer'/>
                {/* style={validatedClient() && {opacity: 0.3}} */}
            </form>
        </>
    )
}

//HOC
export default withRouter(Register);

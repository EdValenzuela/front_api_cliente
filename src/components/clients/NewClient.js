import React, { useState } from 'react';
import clienteAxios from '../config/axios';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

const NewClient = ({history}) => {

    const [newClient, saveNewClient] = useState({
        nombre: '',
        apellido: '',
        profesion: '',
        email: '',
        telefono: ''
    });

    const {nombre, apellido, profesion, email, telefono} = newClient;

    const handleChange = e =>{
        saveNewClient({
            ...newClient,
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

        if(!nombre || !apellido || !profesion || !email || !telefono){
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Completa los campos'
            })
            return;
        }
        
        clienteAxios.post('/clientes', newClient)
            .then(res => {
                if(res.data.code === 11000){
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'Cliente ya registrado'
                    })
                }else{
                    Swal.fire(
                        'Se agregó el cliente',
                        res.data.message,
                        'success'
                    )
                }
                
                history.push('/');
                
            });  
    }

    return (
        <>
            <h1 className="text-3xl text-center font-bold uppercase p-10">Nuevo Cliente</h1>

            <form onSubmit={handleSubmit} className="w-1/2 bg-white flex flex-col mx-auto">
                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Datos del cliente</h2>
                <p className="leading-relaxed mb-5 text-gray-600">Completa todos los campos</p>
                <div className="relative mb-4">
                    <label htmlFor="nombre" className="leading-7 text-sm text-gray-600">Nombre</label>
                    <input type="text" onChange={handleChange} id="nombre" placeholder="Nombre cliente" name="nombre" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                <div className="relative mb-4">
                    <label htmlFor="apellido" className="leading-7 text-sm text-gray-600">Apellido</label>
                    <input type="text" onChange={handleChange} id="apellido" placeholder="Apellido cliente" name="apellido" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                <div className="relative mb-4">
                    <label htmlFor="profesion" className="leading-7 text-sm text-gray-600">Profesion</label>
                    <input type="text" onChange={handleChange} id="profesion" placeholder="Profesion cliente" name="profesion" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                    <input type="email" onChange={handleChange} id="email" placeholder="correo@correo.com" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                <div className="relative mb-4">
                    <label htmlFor="telefono" className="leading-7 text-sm text-gray-600">Teléfono</label>
                    <input type="tel" onChange={handleChange} id="telefono" placeholder="Teléfono cliente" name="telefono" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                <input type="submit" value="agregar cliente" className='text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg uppercase'/>
                {/* style={validatedClient() && {opacity: 0.3}} */}
            </form>
        </>
    )
}

//HOC
export default withRouter(NewClient);

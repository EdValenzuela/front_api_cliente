import React from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const CardClients = ({item}) => {

    const {_id, nombre, apellido, profesion, email, telefono} = item;

    const deleteClient = id => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: 'Un cliente eliminado no se puede recuperar',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar cliente!',
            cancelButtonText: 'Cancelar'
        }).then(result =>{
            if(result.value){
                clienteAxios.delete(`/clientes/${id}`)
                    .then(res => {
                        Swal.fire(
                            'Eliminado!',
                            res.data.message,
                            'success'
                        );
                    });
            }
        });
    }

    return (
        <>
            <li className="xl:w-1/4 md:w-1/2 w-full p-2">
                <div className="bg-gray-100 p-6 rounded-lg hover:bg-gray-300">
                    <h3 className="inline-block py-1 rounded text-blue-900 text-base font-medium tracking-widest">{profesion}</h3>
                    <h2 className="text-lg text-gray-900 font-medium title-font uppercase">{nombre} {apellido}</h2>
                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{email}</h3>
                    <p className="leading-relaxed text-base mt-4">Tel: {telefono}</p>
                    <div className="flex justify-around mt-5 flex-col md:flex-row">
                        <button 
                            onClick={ () => deleteClient(_id)} 
                            className="capitalize rounded border-0 p-2 focus:outline-none bg-red-500 text-white text-center">
                                Eliminar cliente
                        </button>
                        <Link 
                            to={`/pedidos/new/${_id}`} 
                            className="capitalize rounded border-0 p-2 focus:outline-none my-2 md:my-0 md:mr-2 md:ml-2 bg-green-500 text-white text-center">
                                Nuevo pedido
                        </Link>
                        <Link 
                            to={`/clientes/edit/${_id}`} 
                            className="capitalize rounded border-0 p-2 focus:outline-none bg-yellow-500 text-white text-center">
                                Editar cliente
                        </Link>
                    </div>
                </div>
            </li>
        </>
    )
}

export default CardClients

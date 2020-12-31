import React from "react";
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

import { IconContext } from "react-icons";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const CardProduct = ({ item }) => {

  const { _id, nombre, imagen, precio } = item;

  const deleteProduct = id =>{

    Swal.fire({
        title: '¿Estas seguro?',
        text: 'Un producto eliminado no se puede recuperar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar producto!',
        cancelButtonText: 'No, Cancelar'
    }).then(result =>{
        if(result.value){
            clienteAxios.delete(`/productos/${id}`)
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
    <li className="xl:w-1/4 md:w-1/3 w-full m-2 p-2 border">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
            <div className="block w-full relative h-48 rounded overflow-hidden">
              {
                  imagen ? (
                    <img
                        alt="img"
                        className="object-contain w-full h-full"
                        src={`http://localhost:5000/${imagen}`}
                    />
                  ) : null 
              }
            </div>
            <div className="mt-4">
              <h2 className="text-gray-900 title-font text-lg font-medium uppercase">
                {nombre}
              </h2>
              <p className="mt-1">${precio}</p>
            </div>
            <div className="flex w-full justify-between px-2 mt-5 flex-col lg:flex-row">
                <button 
                    onClick={ () => deleteProduct(_id)} 
                    className="flex justify-center items-center capitalize rounded border-0 py-2 px-4 mb-2 lg:mb-0 focus:outline-none bg-red-500 text-white">
                        Eliminar
                        <IconContext.Provider value={{ color: "white", size:'1.5rem', style:{ marginLeft: '10px' }}}>
                            <div><AiFillDelete /></div>
                        </IconContext.Provider>
                </button>
                <Link 
                    to={`/productos/edit/${_id}`} 
                    className="flex justify-center items-center ali capitalize rounded border-0 py-3 px-5 focus:outline-none bg-blue-500 text-white text-center">
                        Editar
                        <IconContext.Provider value={{ color: "white", size:'1.5rem', style:{ marginLeft: '10px' }}}>
                            <div><AiFillEdit /></div>
                        </IconContext.Provider>
                </Link>
            </div>
        </div>
      </div>
    </li>
  );
};

export default CardProduct;

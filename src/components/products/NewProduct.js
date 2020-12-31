import React, { useState } from 'react';
import clienteAxios from '../config/axios';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

const NewProduct = ({history}) => {

    const [newProduct, saveNewProduct] = useState({
        nombre: '',
        precio: ''
    });

    const [imagenUp, saveImagenUp] = useState('');

    const handleChange = e =>{
        saveNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleSaveImagen = e =>{
        saveImagenUp(e.target.files[0]);
    }

    // const validatedClient = () =>{
    //     const {nombre, apellido, profesion, email, telefono} = newClient;
    //     const valido = !nombre.length || !apellido.length || !profesion.length 
    //                 || !email.length || !telefono.length;
    //     return valido;
    // }

    const handleSubmit = async e =>{
        e.preventDefault();

        if(!newProduct.nombre || !newProduct.precio || !imagenUp){
            Swal.fire({
                icon: 'error',
                title: 'Campo vacio',
                text: 'Debe completar los campos!'
            })
            return;
        }

        const formData = new FormData();
        formData.append('nombre', newProduct.nombre);
        formData.append('precio', newProduct.precio);
        formData.append('imagen', imagenUp);

        try {
            const res = await clienteAxios.post('/productos', formData, {
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            });
            if(res.status === 200){
                Swal.fire(
                    'Agregado satisfactoriamente',
                    res.data.message,
                    'success'
                )
            }
            history.push("/productos");
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Vuelve a intentarlo'
            })
        }  
    }

    return (
        <>
            <h1 className="text-3xl text-center font-bold uppercase p-10">Nuevo producto</h1>

            <form onSubmit={handleSubmit} className="w-full md:w-1/2 bg-white flex flex-col mx-auto">
                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Datos del producto</h2>
                <p className="leading-relaxed mb-5 text-gray-600">Completa todos los campos</p>
                <div className="relative mb-4">
                    <label htmlFor="nombre" className="leading-7 text-sm text-gray-600">Nombre</label>
                    <input 
                        type="text" 
                        onChange={handleChange} 
                        id="nombre" 
                        placeholder="Nombre" 
                        name="nombre" 
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="precio" className="leading-7 text-sm text-gray-600">Precio</label>
                    <input 
                        type="number" 
                        onChange={handleChange} 
                        id="precio" 
                        min="0"
                        step="1"
                        placeholder="Precio" 
                        name="precio" 
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="imagen" className="leading-7 text-sm text-gray-600">Imagen</label>
                    <input 
                        type="file" 
                        onChange={handleSaveImagen} 
                        id="imagen" 
                        placeholder="Imagen" 
                        name="imagen" 
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <input type="submit" value="agregar producto" className='text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg uppercase'/>
                {/* style={validatedClient() && {opacity: 0.3}} */}
            </form>
        </>
    )
}

//HOC
export default withRouter(NewProduct);

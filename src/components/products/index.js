import React, { useContext, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';

import CardProduct from './CardProduct';
import { MyAuthContext } from '../../context/AuthContext';

import { ClipLoader } from 'react-spinners';
import { IconContext } from "react-icons";
import { AiFillFileAdd } from "react-icons/ai";

const MainProducts = ({history}) => {

    const [dataProducts, saveDataProducts] = useState([]);
    const [auth] = useContext(MyAuthContext);

    useEffect( ()=> {
        if(auth.token !== ''){
            const getProducts = async() =>{
                try {
                    const res = await clienteAxios.get('/productos', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                    saveDataProducts(res.data);
                }catch (error) {
                    if(error.response.status === 500){
                        history.push('/iniciar-sesion');
                    }
                }
            }
            getProducts();
        }else{
            history.push('/iniciar-sesion');
        }
    },[dataProducts]);

    if(!auth.auth) {
        history.push('/iniciar-sesion');
    }

    return (
        <>
            <h1 className="text-3xl text-center font-bold uppercase p-10">Productos</h1>

            <Link 
                to={"/productos/new"} 
                className="flex justify-center w-full sm:w-2/5 xl:w-1/4 items-center text-white bg-blue-500 border-0 py-3 px-5 -m-2 focus:outline-none hover:bg-blue-600 rounded text-lg mb-10">
                    Agregar nuevo producto
                    <IconContext.Provider value={{ color: "white", size:'1.5rem', style:{ marginLeft: '10px' }}}>
                        <div><AiFillFileAdd /></div>
                    </IconContext.Provider>
            </Link>

            <ul className="flex flex-wrap -m-4">
            {
                dataProducts.length > 0 ? (
                    dataProducts.map( item => (
                        <CardProduct key={item._id} item={item}/>
                    ))
                ): <ClipLoader size={50} color="blue" /> 
            } 
            </ul>
        </>
    )
}

export default withRouter(MainProducts)

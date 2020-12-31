import React, { useContext, useEffect, useState } from 'react';
import clienteAxios from '../config/axios';
import { Link, withRouter } from 'react-router-dom';

import { MyAuthContext } from '../../context/AuthContext';

import CardClients from '../clients/CardClients';

import { ClipLoader } from 'react-spinners';
import { IconContext } from "react-icons";
import { AiFillFileAdd } from "react-icons/ai";


const MainClients = ({history}) => {

    const [dataClients, saveDataClients] = useState([]);

    const [auth] = useContext(MyAuthContext);
    
    useEffect( ()=> {
        if(auth.token !== ''){
            const getClients = async() =>{
                try {
                    const res = await clienteAxios.get('/clientes', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                    saveDataClients(res.data);
                }catch (error) {
                    if(error.response.status === 500){
                        history.push('/iniciar-sesion');
                    }
                }
            }
            getClients();
        }else{
            history.push('/iniciar-sesion');
        }
    },[dataClients]);

    if(!auth.auth) {
        history.push('/iniciar-sesion');
    }

    return (
        <>
            <h1 className="text-3xl text-center font-bold uppercase p-10">Clientes</h1>

            <Link 
                to={"/clientes/new"} 
                className="flex items-center w-full sm:w-2/5 xl:w-1/4 text-white bg-blue-500 border-0 py-2 px-8 -m-2 focus:outline-none hover:bg-blue-600 rounded text-lg mb-10">
                    Agregar nuevo cliente
                    <IconContext.Provider value={{ color: "white", size:'1.5rem', style:{ marginLeft: '10px' }}}>
                        <div><AiFillFileAdd /></div>
                    </IconContext.Provider>
            </Link>

            <ul className="flex flex-wrap -m-4">
            {
                dataClients.length > 0 ? (
                    dataClients.map( item => (
                        <CardClients key={item._id} item={item}/>
                    ))
                ): <ClipLoader size={50} color="blue" /> 
            } 
            </ul>
            
        </>
    )
}

export default withRouter(MainClients)

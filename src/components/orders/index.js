import React, { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import CardOrder from './CardOrder';
import { ClipLoader } from 'react-spinners';

const MainOrders = () => {

    const [orders, saveOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () =>{
            const res = await clienteAxios.get('/pedidos');
            saveOrders(res.data);
        }
        getOrders();
    }, [])

  return (
    <>
      <h1 className="text-3xl text-center font-bold uppercase p-10">Pedidos</h1>
      <ul className="flex flex-wrap -m-4">
            {
                orders.length > 0 ? (
                    orders.map( item => (
                        <CardOrder key={item._id} item={item}/>
                    ))
                ): <ClipLoader size={50} color="blue" /> 
            } 
        </ul>
    </>
  );
};

export default MainOrders;

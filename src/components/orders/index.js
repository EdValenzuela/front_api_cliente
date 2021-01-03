import React, { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import CardOrder from './CardOrder';
import { ClipLoader } from 'react-spinners';

const MainOrders = () => {

    const [orders, saveOrders] = useState([]);
    const [loadingData, saveLoadingData] = useState(false);
    const getOrders = async () =>{
        try {
            const res = await clienteAxios.get('/pedidos');
            saveOrders(res.data);
            saveLoadingData(true);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getOrders();
    }, [])

  return (
    <>
      <h1 className="text-3xl text-center font-bold uppercase p-10">Pedidos</h1>
      <ul className="flex flex-wrap -m-4">
            {
                loadingData ? (
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

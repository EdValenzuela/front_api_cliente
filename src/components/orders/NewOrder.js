import React,{ useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';
import SearchOrders from './SearchOrders';

import Swal from 'sweetalert2';
import NumberOrder from './NumberOrder';

const NewOrder = ({history}) => {

    const { id } = useParams();
    const [client, saveClient] = useState({});
    const [search, saveSearch] = useState('');
    const [products, saveProducts] = useState([]);
    const [total, saveTotal] = useState(0);

    useEffect(() => {
        const getPedidos = async ()=>{
            const res = await clienteAxios.get(`/clientes/${id}`);
            saveClient(res.data);
        }
        getPedidos();

        actualizarTotal();
    
    }, [products]);

    const searchProduct = async e => {
        e.preventDefault();
        
        if(search.trim() === ''){
            Swal.fire({
                icon: 'error',
                title: 'Campo vacio',
                text: 'Debe ingresar un producto!'
            })
            return;
        }

        const res = await clienteAxios.post(`/productos/busqueda/${search}`)
        
        if(res.data[0]){
            let productoResultado = res.data[0];
            productoResultado.producto = res.data[0]._id;
            productoResultado.cantidad = 0;

            saveProducts([...products, productoResultado]);

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Busqueda',
                text: 'No se encontraron resultados'
            })
        }
    }

    const handleSearch = e =>{
        saveSearch(e.target.value);
    }
 
    const restarCantidad = i =>{
        const allProducts = [...products];
        // disminuyo la cantidad del arreglo y si es 0 return

        if(allProducts[i].cantidad === 0) return;
        allProducts[i].cantidad--;
        saveProducts(allProducts);
    }

    const aumentarCantidad = i =>{
        const allProducts = [...products];
        allProducts[i].cantidad++;
        saveProducts(allProducts);
    }

    const actualizarTotal = () =>{
        if(products.length === 0){
            saveTotal(0);
            return;
        }

        let nuevoTotal = 0;
        products.map( item => nuevoTotal += (item.cantidad * item.precio) );

        saveTotal(nuevoTotal);
    }

    const eliminarProductoPedido = id =>{
        const allProducts = products.filter(item => item.producto !== id);

        saveProducts(allProducts);
    }

    const handleSubmitOrder = async e => {
        e.preventDefault();

        const pedidoFinal = {
            "cliente": id,
            "pedido": products,
            "total": total
        }

        const res = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedidoFinal);

        if(res.status === 200){
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: res.data.message
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Vuelve a intentarlo'
            })
        }

        history.push('/');
    }

    return (
        <>
            <h1 className="text-3xl text-center font-bold uppercase p-10">Nuevo Pedido</h1>
            <div className="w-full bg-blue-100 p-3 border-gray-200 rounded-lg border-4">
                <p className="text-base text-left font-medium capitalize pb-4">Datos Cliente</p>
                <p className="block py-1 rounded text-blue-500 text-sm capitalize font-medium tracking-widest">
                    Nombre: {client.nombre} {client.apellido}
                </p>
                <p className="block py-1 rounded text-blue-500 text-sm capitalize font-medium tracking-widest">
                    Teléfono: {client.telefono}
                </p>
            </div>

            <SearchOrders searchProduct={searchProduct} handleSearch={handleSearch} />

            <ul>
                {
                    products.map( (item, index) => (
                        <NumberOrder 
                            key={item.producto} 
                            item={item}
                            index={index} 
                            restarCantidad={restarCantidad}
                            aumentarCantidad={aumentarCantidad}
                            eliminarProductoPedido={eliminarProductoPedido}
                        />
                    ))
                }
            </ul>

            <p className="font-bold text-xl">Total a pagar : <span>$ {total}</span></p>

            {
                total > 0 && (
                    <form 
                        onSubmit={handleSubmitOrder}
                        className="p-5 flex justify-center items-center">
                        <input 
                            type="submit"
                            className="sm:w-1/2 w-full cursor-pointer py-2 px-5 bg-blue-500 rounded-md text-xl text-white text-center"
                            value="Realizar Pedido"
                        />
                    </form>
                )
            }
        </>
    )
}

export default withRouter(NewOrder)

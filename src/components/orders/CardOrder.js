import React from 'react'

const CardOrder = ({item}) => {

    const {total, cliente, pedido} = item;
    return (
        <li className="text-gray-600 body-font mb-4">
            
            <div className="container px-5 mx-auto">
                
                <div className="flex flex-wrap -m-4">
                    <div className="w-full p-4">
                        <div className="border border-gray-200 p-6 rounded-lg">
                            <div className="bg-blue-100 p-2 mb-2 rounded-lg">
                                <p className="block py-1 rounded text-blue-500 text-sm capitalize font-medium tracking-widest">
                                    Cliente: {cliente.nombre} {cliente.apellido}
                                </p>
                            </div>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                                Productos :
                            </h2>
                            <ul>
                                {
                                    pedido.map( item => (
                                        <li key={item._id}>
                                            <p className="capitalize leading-relaxed text-base">Nombre: {item.producto.nombre}</p>
                                            <p className="capitalize leading-relaxed text-base">Precio: ${item.producto.precio}</p>
                                            <p className="capitalize leading-relaxed text-base">Cantidad : {item.cantidad}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                            <p className="bg-red-100 p-2 mt-2 rounded-lg leading-relaxed text-base">Total: ${total}</p>
                        </div>
                    </div>
                </div>
            </div>
      </li>
    )
}

export default CardOrder

import React from "react";
import { IconContext } from "react-icons";
import { AiFillMinusCircle, AiFillPlusCircle, AiFillCloseCircle } from "react-icons/ai";

const NumberOrder = (props) => {
  const { item, restarCantidad, aumentarCantidad, eliminarProductoPedido, index } = props;
  const { nombre, precio, cantidad, imagen } = item;

  return (
    <li className="xl:w-1/4 md:w-1/3 w-full m-2 p-2 border">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="block w-full relative h-48 rounded overflow-hidden">
            {imagen ? (
              <img
                alt="img"
                className="w-full h-auto"
                src={`http://localhost:5000/${imagen}`}
              />
            ) : null}
          </div>
          <div className="mt-4 w-full">
            <h2 className="text-gray-900 title-font text-lg font-medium uppercase">
              {nombre}
            </h2>

            <p className="my-4">${precio}</p>

            <div className="w-full flex justify-between items-center">
              <IconContext.Provider value={{ color: "gray", size: "2rem" }}>
                <div
                  className="cursor-pointer"
                  onClick={() => restarCantidad(index)}
                >
                  <AiFillMinusCircle />
                </div>
              </IconContext.Provider>
              <p className="text-xl font-bold">{cantidad}</p>
              <IconContext.Provider value={{ color: "gray", size: "2rem" }}>
                <div
                  className="cursor-pointer"
                  onClick={() => aumentarCantidad(index)}
                >
                  <AiFillPlusCircle />
                </div>
              </IconContext.Provider>
            </div>
          </div>
          <div className="flex w-full justify-between px-2 mt-5 flex-col lg:flex-row">
            <button
                onClick={ () => eliminarProductoPedido(item.producto)} 
                className="flex justify-center items-center capitalize rounded border-0 py-2 px-4 mb-2 lg:mb-0 focus:outline-none bg-red-500 text-white">
                    Eliminar
                <IconContext.Provider value={{ color: "white", size:'1.5rem', style:{ marginLeft: '10px' }}}>
                    <div><AiFillCloseCircle /></div>
                </IconContext.Provider>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default NumberOrder;

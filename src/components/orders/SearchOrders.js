import React from 'react'

const SearchOrders = ({searchProduct, handleSearch}) => {
    return (
        
        <form onSubmit={searchProduct}  className="flex flex-col w-full max-w-3xl my-4">
            <p className="text-base mt-2 text-gray-500 mb-4 w-full">Buscar producto</p>
                <div className="flex items-center justify-between w-full">
                    <input 
                        className="w-1/2 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Ingresa un producto"
                        name="nameSearch"
                        onChange={ handleSearch }
                    />
                    <input
                        type="submit"
                        value="Buscar"
                        className="bg-blue-500 text-white px-5 py-2 text-xl rounded-md"
                    />
                </div>
        </form>
    )
}

export default SearchOrders

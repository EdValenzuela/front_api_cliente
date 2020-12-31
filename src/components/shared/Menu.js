import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { MyAuthContext } from '../../context/AuthContext';

const Menu = ({history}) => {

    const [auth, saveToken] = useContext(MyAuthContext);

    const cerrarSesion = () => {
      saveToken({
        token: '',
        auth: false
      });

      localStorage.setItem('token','');
      history.push('/iniciar-sesion');
    }
    
    if(!auth.auth) return null;

    return (
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to={"/"} className="mr-5 hover:text-green-900 text-white cursor-pointer">Clientes</Link>
          <Link to={"/productos"} className="mr-5 hover:text-green-900 text-white cursor-pointer">Productos</Link>
          <Link to={"/pedidos"} className="mr-5 hover:text-green-900 text-white cursor-pointer">Pedidos</Link>
          {
            auth.auth ? (
              <div onClick={cerrarSesion} className="bg-red-500 px-4 py-2 mt-2 sm:mt-0 font-bold text-white rounded-lg uppercase cursor-pointer">Cerrar Sesión</div>
            ):null
          }
          
        </nav>
    )
}

export default withRouter(Menu)

import React, { useContext } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from '../shared/Header';

import MainClients from '../clients';
import NewClient from '../clients/NewClient';
import EditClient from '../clients/EditClient';

import MainProducts from '../products';
import NewProduct from '../products/NewProduct';
import EditProduct from '../products/EditProduct';

import MainOrders from '../orders';
import NewOrder from '../orders/NewOrder';

import Login from '../../auth/Login';
import Register from '../../auth/Register';

import {AuthContext, MyAuthContext } from '../../context/AuthContext';

import PrivateRoute from './PrivateRoute';

const RouterDom = () => {

    const [auth, saveToken] = useContext(MyAuthContext);
   
    return (
        <HashRouter basename="/">
            <div className="w-full">
                <AuthContext value={[auth, saveToken]}>
                    <Header/>
                    <div className="container px-5 pb-5 mx-auto bg-white h-full">
                        <Switch>
                            <PrivateRoute exact path="/" component={ MainClients } />
                            <PrivateRoute exact path="/clientes/new" component={ NewClient } />
                            <PrivateRoute exact path="/clientes/edit/:id" component={ EditClient } />

                            <PrivateRoute exact path="/productos" component={ MainProducts } />
                            <PrivateRoute exact path="/productos/new" component={ NewProduct } />
                            <PrivateRoute exact path="/productos/edit/:id" component={ EditProduct } />

                            <PrivateRoute exact path="/pedidos" component={ MainOrders } />
                            <PrivateRoute exact path="/pedidos/new/:id" component={ NewOrder } />

                            <Route exact path="/iniciar-sesion" component={ Login } />
                            <Route exact path="/registrar-usuario" component={ Register } />
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </AuthContext> 
            </div>
        </HashRouter>
    )
}

export default RouterDom

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './views/Logon';
import Register from './views/Register';
import Profile from './views/Profile';
import NewIncident from './views/NewIncident';

export default function Routes(){
    //O Switch vai garantir que apenas uma rota seja chamada por momento

    /**
     * Usando a propriedade "exact" determinamos que a rota digitada
     * tem que ser exatamente igual a "/" para ser acessada
     */ 
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/cadastro" component={Register}/>
                <Route path="/perfil" component={Profile}/>
                <Route path="/caso/novo" component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    );
}
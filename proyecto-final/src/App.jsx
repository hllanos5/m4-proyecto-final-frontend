import { useState } from 'react'
import ProtectedRoute from './domain/shared/routes/ProtectedRoute';
import { Switch, Route } from 'wouter';
import Login from './domain/shared/pages/Login'
import DashBoard from './domain/shared/pages/DashBoard';
import Incidencia from './domain/user/pages/Incidencia';
import IncidenciaDetalle from './domain/user/pages/IncidenciaDetalle';

function App() {

  return (
    <>
      <Switch>
        <Route path='/' component={Login} />
        <ProtectedRoute>
          <Route path='/dashboard' component={DashBoard} />
          <Route path='/incidencias' component={Incidencia} />
          <Route path='/incidencias-detalle/:id' component={IncidenciaDetalle} />
        </ProtectedRoute>
      </Switch>
    </>
  )
}

export default App

import { useState } from 'react'
import ProtectedRoute from './domain/shared/routes/ProtectedRoute';
import { Switch, Route } from 'wouter';
import Login from './domain/shared/pages/Login'
import DashBoard from './domain/shared/pages/DashBoard';
import Incidencia from './domain/user/pages/Incidencia';

function App() {

  return (
    <>
      <Switch>
        <Route path='/' component={Login} />
        <ProtectedRoute>
          <Route path='/dashboard' component={DashBoard} />
          <Route path='/incidencias' component={Incidencia} />
        </ProtectedRoute>
      </Switch>
    </>
  )
}

export default App

import { useState } from 'react'
import ProtectedRoute from './domain/shared/routes/ProtectedRoute';
import { Switch, Route } from 'wouter';
import Login from './domain/shared/pages/Login'
import DashBoard from './domain/shared/pages/DashBoard';

function App() {

  return (
    <>
      <Switch>
        <Route path='/' component={Login} />
        <ProtectedRoute>
          <Route path='/dashboard' component={DashBoard} />
        </ProtectedRoute>
      </Switch>
    </>
  )
}

export default App

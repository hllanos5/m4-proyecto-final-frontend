import { useState } from 'react'
import { Switch, Route } from 'wouter';
import Login from './domain/shared/pages/Login'
import DashBoard from './domain/shared/pages/DashBoard';

function App() {

  return (
    <>
      <Switch>
        <Route path='/' component={Login} />
        <Route path='/dashboard' component={DashBoard} />
      </Switch>
    </>
  )
}

export default App

import React,{ ReactElement, useState } from 'react'
import './App.css'
import axios from 'axios'
import Register from './register'
import Login from './login'
import Account from './Account'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Transfers from './tranfers'






function App() {
  const [user, setUser] = useState([])
  const [balance, setBalance] = useState()
  const [route, setRoute] = useState('login')



  const saveUser = (user:any) =>{
    setUser(user)
  }

  const onRouteChange = (route:any) => {
    setRoute(route)
  }

  const showBalance = (balance: any) => {
    setBalance(balance)
  }
  

  return (
    <div className='app-container'>
      
      {route === 'account'
      ?<div>
        <Account name={user} ChangeRoute={onRouteChange} showBalance={showBalance} balance={balance}/>
      </div>
      :(route === 'transaction'
      ? <Transfers name={user} ChangeRoute={onRouteChange} showBalance={showBalance} balance={balance}/>
      :(route === 'login'
      ? <Login onAddUser={saveUser} ChangeRoute={onRouteChange}/> 
      :<Register ChangeRoute={onRouteChange} />
      )
      )
      
  }
        
      
</div>
        
      
      
   
    
  )
}

export default App

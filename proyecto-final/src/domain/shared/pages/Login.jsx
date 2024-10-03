import React, { useState, useRef, useContext, useEffect  } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const { loginMutation } = useContext(AuthContext);
    
    const handleLogin = async e => {
        e.preventDefault();
        const data = {
            correo: e.target.correo.value,
            password: e.target.password.value,
        };

        await loginMutation.mutate(data);

  };
  
    return (
    <form onSubmit={handleLogin}>
        <div className='frm-login'>
            <div><img src="logo.png" alt="" width={150} /></div>
            <div><label className='negrita titulo'>Gestion de Incidencias</label></div>
            
            <IconField iconPosition="left">
                <InputIcon className="pi pi-envelope"> </InputIcon>
                <InputText v-model="value1" placeholder="Email" name='correo'/>
            </IconField>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-lock"> </InputIcon>
                <InputText v-model="value1" placeholder="Password" type='password' name='password'/>
            </IconField>
            <Button label="Acceder"  type='submit'/>            
            
        </div>
    </form>
  )
}

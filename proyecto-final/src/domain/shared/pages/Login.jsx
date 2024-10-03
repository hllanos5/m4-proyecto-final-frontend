import React from 'react'
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
//import { AuthContext } from '../../shared/context/authContext';

export default function Login() {
    //const { loginMutation } = useContext(AuthContext);
    
    const handleLogin = async e => {
        e.preventDefault();
        /*const data = {
            username: e.target.username.value,
            password: e.target.password.value,
        };

        await loginMutation.mutate(data);*/

  };
  
    return (
    <form onSubmit={handleLogin}>
        <div className='frm-login'>
            <div><img src="logo.png" alt="" width={150} /></div>
            <div><label className='negrita titulo'>Gestion de Incidencias</label></div>
            
            <IconField iconPosition="left">
                <InputIcon className="pi pi-envelope"> </InputIcon>
                <InputText v-model="value1" placeholder="Email" name='username'/>
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

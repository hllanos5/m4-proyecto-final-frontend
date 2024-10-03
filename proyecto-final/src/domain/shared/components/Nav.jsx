import React, { useRef, useContext } from 'react'
import { OverlayPanel } from 'primereact/overlaypanel';
import { Avatar } from 'primereact/avatar';
import { useLocation } from 'wouter';
import { AuthContext } from '../context/AuthContext';

export default function Nav() {
    const [, navigate] = useLocation();    
    const {user} = useContext(AuthContext);
    const op = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        console.clear();
        navigate('/');
      };

    return (
        <nav>
            <label htmlFor="">{user?.nombre} {user?.paterno} {user?.materno}</label>
            <Avatar image="logo.png" shape="circle" onClick={(e) => op.current.toggle(e)}/>

            <OverlayPanel ref={op}>
                <div><i className='pi pi-user icono'></i> My profile</div>
                <div className='logout' onClick={handleLogout}> <i className='pi pi-sign-out'></i> Logout</div>
            </OverlayPanel>
        </nav>
    )
}

import React, { useContext } from 'react'
import { TieredMenu } from 'primereact/tieredmenu';
import { useLocation } from 'wouter';
import { AuthContext } from '../context/AuthContext';

export default function SideBar() {
    const [, navigate] = useLocation();

    const {user} = useContext(AuthContext);

    const menuAdministrador = [
        {
            label: 'Incidencias',
            icon: 'pi pi-wrench',
            command: () => {
                navigate("/incidencias");
            }
        },
        {
            label: 'Usuarios',
            icon: 'pi pi-user',
            command: () => {
                alert("Usuarios Admi");
                //navigate("/examen-alumno");
            }
        },
        {
            label: 'Reportes',
            icon: 'pi pi-list-check',
            command: () => {
                alert("Reportes Admi");
            }
        }
    ];

    const menuResidente = [
        {
            label: 'Incidencias',
            icon: 'pi pi-wrench',
            command: () => {
                alert("Incidencias Residente");
                //navigate("/examen-alumno");
            }
        },
        {
            label: 'Reportes',
            icon: 'pi pi-list-check',
            command: () => {
                alert("Reportes Residente");
            }
        }
    ];

    let items =  menuAdministrador;
    if(user?.rol === 'RESIDENTE'){
        items = menuResidente;
    }

    return (
        <aside>
            <h4>Incidencias</h4>
            <TieredMenu model={items} breakpoint="767px" />
        </aside>
    )
}

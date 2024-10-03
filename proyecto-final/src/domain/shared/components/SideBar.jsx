import React from 'react'
import { TieredMenu } from 'primereact/tieredmenu';

export default function SideBar() {

    const items = [
        {
            label: 'Exámenes',
            icon: 'pi pi-file-edit',
            command: () => {
                alert("Exámenes Alumno");
            }
        },
        {
            label: 'Mis Videos',
            icon: 'pi pi-video',
            command: () => {
                alert("Mis videos");
            }
        },
        {
            label: 'Exámenes',
            icon: 'pi pi-file-edit',
            command: () => {
                alert("Exámenes Profesor");
            }
        },
        {
            label: 'Mis Alumnos',
            icon: 'pi pi-video',
            command: () => {
                alert("Mis Alumnos");
            }
        },
        {
            label: 'Nuevo Examen',
            icon: 'pi pi-pencil',
            command: () => {
                alert("Mi examen");
            }
        }
        
    ];

    return (
        <aside>
            <h4>Funval</h4>
            <TieredMenu model={items} breakpoint="767px" />
        </aside>
    )
}

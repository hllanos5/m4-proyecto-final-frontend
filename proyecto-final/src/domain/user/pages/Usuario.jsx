import React, { useState, useRef, useContext, useEffect  } from "react";
import Layout from '../../shared/layout/Layout';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Accordion, AccordionTab } from 'primereact/accordion';
import useUsuario from "../../shared/services/useUsuario";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Usuario() {
    const { aUsuario, isUsuarioLoading } = useUsuario();
    const [ usuarios, setUsuarios] = useState([]);

    const cargarData= ()=>{
        if (!isUsuarioLoading) {
            setUsuarios(aUsuario);
        }
    }

    useEffect(() => {
        cargarData();
    }, [aUsuario, isUsuarioLoading]);


    return (
        <Layout>
            <div className='listado-usuarios'>
                <h1>Listado de Usuarios</h1>        
                <Accordion activeIndex={0} className="usuario-filtros-card">
                    <AccordionTab header="Filtros">
                        <div className="fila">
                            <label htmlFor="">Nombre:</label>
                            <InputText id="nombre" className="p-inputtext-sm" name="nombre"/>
                        </div>
                    </AccordionTab>
                </Accordion>
                <div className="acciones">
                        <Button icon="pi pi-plus" severity="info" aria-label="Notification"  onClick={() => setVisible(true)} />
                </div>
                <DataTable value={usuarios} tableStyle={{ minWidth: '50rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                    <Column field="id" header="Id" style={{ width: '10%' }}></Column>
                    <Column field="nombres" header="Nombres" style={{ width: '20%' }}></Column>
                    <Column field="telefono" header="Telefono" style={{ width: '20%' }}></Column>
                    <Column field="correo" header="correo" style={{ width: '10%' }} ></Column>
                    <Column header="Opciones" style={{ width: '20%' }} ></Column>
                </DataTable>
            </div>
        </Layout>
    )
}

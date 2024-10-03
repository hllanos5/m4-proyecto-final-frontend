import React, { useState, useRef, useContext, useEffect  } from "react";
import Layout from '../../shared/layout/Layout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import useIncidencia from "../../shared/services/useIncidencia"; 
import IncidenciaFiltros from "../components/IncidenciaFiltros";

export default function Incidencia() {    
    const { aIncidencia, isIncidenciaLoading } = useIncidencia();
    const [ incidencia, setIncidencia] = useState([]);    

    useEffect(() => {
        if (!isIncidenciaLoading) {
            setIncidencia(aIncidencia);
        }
    }, [aIncidencia, isIncidenciaLoading]);


    if (isIncidenciaLoading) {
        return <div>Cargando ...</div>;
    }
    
    const statusBodyTemplate = (incidencia) => {
        return <Tag value={incidencia.estado} severity={getSeverity(incidencia)}></Tag>;
    };
    
    const getSeverity = (incidencia) => {
        switch (incidencia.estado) {
            case 'Abierta':
                return 'danger';

            case 'En Progreso':
                return 'warning';

            case 'Cerrada':
                return 'success';

            default:
                return null;
        }
    };

    return (
        <Layout>
        <div className='listado-incidencias'>
            <h1>Listado de Incidencias</h1>
            <IncidenciaFiltros/>
            <DataTable value={incidencia} tableStyle={{ minWidth: '50rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                <Column field="id" header="# Incidencia" style={{ width: '20%' }}></Column>
                <Column field="nombres" header="Nombres" style={{ width: '20%' }}></Column>
                <Column field="titulo" header="Titulo" style={{ width: '20%' }}></Column>
                <Column field="estado" header="Estado" style={{ width: '20%' }} body={statusBodyTemplate}></Column>
                <Column field="fecha_incidencia" header="Fecha Incidencia" style={{ width: '20%' }}></Column>
            </DataTable>
        </div>
    </Layout>
    )
}

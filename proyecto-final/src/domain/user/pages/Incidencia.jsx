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
    const [ incidenciaFiltros, setIncidenciaFiltros] = useState([]);
    const [ filtros, setFiltros ] = useState({});

    const cargarData= ()=>{
        if (!isIncidenciaLoading) {
            setIncidencia(aIncidencia);
            setIncidenciaFiltros(aIncidencia);
        }
        if(filtros.id || filtros.nombres || filtros.titulo || filtros.fechaInicio || filtros.fechaFin || filtros.estado){
            console.log(filtros);
            filtrarIncidencias(filtros);
        }
    }

    useEffect(() => {
        cargarData();
    }, [incidencia, isIncidenciaLoading,filtros]);

    const filtrarIncidencias = (filtros)=>{

        setIncidenciaFiltros(incidencia.filter(element => {

            const fechaIncidencia = new Date(element.fecha_incidencia);
            const fechaInicio = filtros.fechaInicio ? new Date(filtros.fechaInicio) : null;
            const fechaFin = filtros.fechaFin ? new Date(filtros.fechaFin) : null;
            
            return (
                (filtros.id && element.id === filtros.id) ||
                (filtros.nombres && element.nombres.includes(filtros.nombres)) ||
                (filtros.titulo && element.titulo.includes(filtros.titulo)) ||
                (filtros.estado && element.estado === filtros.estado) || 
                (fechaInicio && fechaFin && fechaIncidencia >= fechaInicio && fechaIncidencia <= fechaFin)
            );
        }));
    }
    /* {I} - Funciones complementarias*/
    /*const detailBodyIncident = (rowData) => {
        return <Button type="button" className="p-button-sm p-button-text" onClick={() => handleVerDetalle(rowData, options.frozenRow, options.rowIndex)} />;
    }*/

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
    /* {F} - Funciones complementarias*/

    if (isIncidenciaLoading) {
        return <div>Cargando ...</div>;
    }

    return (
        <Layout>
        <div className='listado-incidencias'>
            <h1>Listado de Incidencias</h1>
            <IncidenciaFiltros setFiltros={setFiltros}/>
            <DataTable value={incidenciaFiltros} tableStyle={{ minWidth: '50rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                <Column field="id" header="# Incidencia" style={{ width: '20%' }}></Column>
                <Column field="nombres" header="Nombres" style={{ width: '20%' }}></Column>
                <Column field="titulo" header="Titulo" style={{ width: '20%' }}></Column>
                <Column field="estado" header="Estado" style={{ width: '20%' }} body={statusBodyTemplate}></Column>
                <Column field="fecha_incidencia" header="Fecha Incidencia" style={{ width: '20%' }}></Column>
                <Column field="fecha_incidencia" header="Fecha Incidencia" style={{ width: '20%' }}></Column>
            </DataTable>
        </div>
    </Layout>
    )
}

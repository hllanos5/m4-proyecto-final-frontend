import React, { useState, useRef, useContext, useEffect  } from "react";
import Layout from '../../shared/layout/Layout';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import useIncidencia from "../../shared/services/useIncidencia"; 
import IncidenciaFiltros from "../components/IncidenciaFiltros";
import { useLocation } from 'wouter';

export default function Incidencia() {    
    const { aIncidencia, isIncidenciaLoading } = useIncidencia();
    const [ incidencia, setIncidencia] = useState([]);
    const [ incidenciaFiltros, setIncidenciaFiltros] = useState([]);
    const [ filtros, setFiltros ] = useState({});
    const [, navigate] = useLocation();

    const cargarData= ()=>{
        if (!isIncidenciaLoading) {
            setIncidencia(aIncidencia);
            setIncidenciaFiltros(aIncidencia);
        }
        if(filtros.id || filtros.nombres || filtros.titulo || filtros.fechaInicio || filtros.fechaFin || filtros.estado){
           
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

    const handleVerDetalle = (data) => {
        navigate("/incidencias-detalle/"+data.id);
    }

    const detailBodyIncident = (rowData) => {
        return <Button type="button" icon="pi pi-search" className="p-button-sm p-button-text" onClick={() => handleVerDetalle(rowData)} />;
    }

    const templateEstado = (incidencia) => {
        return <Tag value={incidencia.estado} severity={getSeverityEstado(incidencia)}></Tag>;
    };

    const templatePrioridad = (incidencia) => {
        return <Tag value={incidencia.prioridad} severity={getSeverityPrioridad(incidencia)}></Tag>;
    };
    
    const getSeverityEstado = (incidencia) => {
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

    const getSeverityPrioridad = (incidencia) => {
        switch (incidencia.prioridad) {
            case 'Alta':
                return 'danger';

            case 'Media':
                return 'warning';

            case 'Baja':
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
                <Column field="id" header="# Incidencia" style={{ width: '10%' }}></Column>
                <Column field="nombres" header="Nombres" style={{ width: '20%' }}></Column>
                <Column field="titulo" header="Titulo" style={{ width: '20%' }}></Column>
                <Column field="estado" header="Estado" style={{ width: '10%' }} body={templateEstado}></Column>
                <Column field="prioridad" header="Prioridad" style={{ width: '10%' }} body={templatePrioridad}></Column>
                <Column field="fecha_incidencia" header="Fecha Incidencia" style={{ width: '20%' }}></Column>
                <Column header="Opciones" style={{ width: '20%' }} body={detailBodyIncident}></Column>
            </DataTable>
        </div>
    </Layout>
    )
}

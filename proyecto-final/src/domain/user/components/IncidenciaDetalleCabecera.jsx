import React from 'react'
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';

export default function IncidenciaDetalleCabecera() {
    const incidencia = JSON.parse(localStorage.getItem('incidencia'));

    const getSeverityPrioridad = (prioridad) => {
        switch (prioridad) {
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

    const getSeverityEstado = (estado) => {
        switch (estado) {
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

    let titulo = `Incidencia # ${incidencia.id} - ${incidencia.titulo}`

    return (
        <Card title={titulo} className="incidencia-cabecera">
            <div className='panel-incidencia-detalle-cabecera'>
                <label className='negrita'>Nombres: </label>
                <label>{incidencia.nombres} </label>
                <label className='negrita'>Prioridad: </label>
                <label><Tag value={incidencia.prioridad} severity={getSeverityPrioridad(incidencia.prioridad)}></Tag> </label>
                <label className='negrita'>Estado: </label>
                <label><Tag value={incidencia.estado} severity={getSeverityEstado(incidencia.estado)}></Tag> </label>
            </div>
        </Card>
    )
}

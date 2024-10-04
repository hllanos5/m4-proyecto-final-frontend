import React from 'react'
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';

export default function IncidenciaDetalleCabecera({data}) {
    console.log(data);


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

    let titulo = `Incidencia # ${data[0]?.incidencia_id}`

    return (
        <Card title={titulo}>
            <div className='panel-incidencia-detalle-cabecera'>
                <label className='negrita'>Titulo: </label>
                <label>{data[0]?.titulo} </label>
                <label className='negrita'>Prioridad: </label>
                <label><Tag value={data[0]?.prioridad} severity={getSeverityPrioridad(data[0]?.prioridad)}></Tag> </label>
                <label className='negrita'>Estado: </label>
                <label><Tag value={data[0]?.estado} severity={getSeverityEstado(data[0]?.estado)}></Tag> </label>
            </div>
        </Card>
    )
}

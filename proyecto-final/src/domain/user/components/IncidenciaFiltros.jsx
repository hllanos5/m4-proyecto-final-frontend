import React, { useState, useRef, useContext, useEffect  } from "react";
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function IncidenciaFiltros() {

    const [dates, setDates] = useState(null);
    const [selectedEstado, setSelectedEstado] = useState(null);
    const estados = [
        { name: 'Abierta', code: 'Abierta' },
        { name: 'En Progreso', code: 'En Progreso' },
        { name: 'Cerrada', code: 'Cerrada' }
    ];

    addLocale('es', {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });

    return (
        <Accordion activeIndex={0} className="incidencia-filtros-card">
            <AccordionTab header="Filtros">
            <div className="incidencias-filtros">
                    <div className="filtro">
                        <label htmlFor="id"># Incidencia</label>
                        <InputText id="id" className="p-inputtext-sm" />
                    </div>
                    <div className="filtro">
                        <label htmlFor="nombres">Nombres</label>
                        <InputText id="nombres" className="p-inputtext-sm" />
                    </div>
                    <div className="filtro">
                        <label htmlFor="titulo">Titulo</label>
                        <InputText id="titulo" className="p-inputtext-sm" />
                    </div>
                    <div className="filtro btn-buscar" >
                        <Button label="Buscar" />
                    </div>
                    <div className="filtro">
                        <label htmlFor="Estado">Fecha Incidencia</label>
                        <Calendar value={dates} locale="es" onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection/>
                    </div>
                    <div className="filtro">
                        <label htmlFor="Estado">Estado</label>
                        <Dropdown value={selectedEstado} onChange={(e) => setSelectedEstado(e.value)} options={estados} optionLabel="name" 
                        placeholder="Seleccione Estado" className="p-inputtext-sm" />
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </AccordionTab>
        </Accordion>        
    )
}

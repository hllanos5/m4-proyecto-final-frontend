import React, { useState, useRef, useContext, useEffect  } from "react";
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function IncidenciaFiltros({setFiltros}) {

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

    const handleSetFiltros = async (e)=> {

        e.preventDefault();

        let estado = "";

        switch (e.target.estado.value) {
            case "0":
                estado = "Abierta"
                break;
            case "1":
                estado = "En Progreso"
                break;
            case "2":
                estado = "Cerrada"
                break;
        }
        const filtros = {} ;

        if((e.target.id.value).length> 0){
            filtros.id = parseInt(e.target.id.value)
        }
        if((e.target.nombres.value).length> 0){
            filtros.nombres = e.target.nombres.value
        }
        if((e.target.titulo.value).length> 0){
            filtros.titulo = e.target.titulo.value
        }
        if((e.target.fecha.value).length> 0){
            const fechaInicio = (e.target.fecha.value).replace(" ","").split("-")[0];
            const fechaFin = (e.target.fecha.value).replace(" ","").split("-")[1];
            filtros.fechaInicio = fechaInicio +" 00:00:00";
            filtros.fechaFin = fechaFin +" 23:59:59";
        }
        if((e.target.estado.value).length> 0){
            filtros.estado = estado
        }

        setFiltros(filtros);        
    }

    return (
        <Accordion activeIndex={0} className="incidencia-filtros-card">
            <AccordionTab header="Filtros">
            <form onSubmit={handleSetFiltros}>
                <div className="incidencias-filtros">
                        <div className="filtro">
                            <label htmlFor="id"># Incidencia</label>
                            <InputText id="id" className="p-inputtext-sm" name="id"/>
                        </div>
                        <div className="filtro">
                            <label htmlFor="nombres">Nombres</label>
                            <InputText id="nombres" className="p-inputtext-sm" name="nombres"/>
                        </div>
                        <div className="filtro">
                            <label htmlFor="titulo">Titulo</label>
                            <InputText id="titulo" className="p-inputtext-sm" name="titulo"/>
                        </div>
                        <div className="filtro btn-buscar" >
                            <Button label="Buscar" type="submit" />
                        </div>
                        <div className="filtro">
                            <label htmlFor="Estado">Fecha Incidencia</label>
                            <Calendar value={dates} locale="es"  className="p-inputtext-sm" dateFormat="yy/mm/dd" onChange={(e) => setDates(e.value)} selectionMode="range" hideOnRangeSelection name="fecha"/>
                        </div>
                        <div className="filtro">
                            <label htmlFor="Estado">Estado</label>
                            <Dropdown value={selectedEstado} onChange={(e) => setSelectedEstado(e.value)} options={estados} optionLabel="name" 
                            placeholder="Seleccione Estado" className="p-inputtext-sm" name="estado"/>
                        </div>
                        <div></div>
                        <div></div>
                    </div>
                </form>
            </AccordionTab>
        </Accordion>        
    )
}

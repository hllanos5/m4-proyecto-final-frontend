import React, { useState, useRef, useContext, useEffect  } from "react";
import { useLocation, useRoute   } from 'wouter';
import Layout from '../../shared/layout/Layout';
import { DataView } from 'primereact/dataview';
import useIncidenciaDetalle from "../../shared/services/useIncidenciaDetalle";
import IncidenciaDetalleCabecera from "../components/IncidenciaDetalleCabecera";

export default function IncidenciaDetalle() {
    //Validacion si existe el parametro que se envia por get
    const [, navigate] = useLocation();
    const [match, params] = useRoute('/incidencias-detalle/:id');

    if(!match){
        navigate("/incidencias");
    }
    //Proceso de obtener data desde el service
    const { aIncidenciaDetalle, isIncidenciaDetalleLoading } = useIncidenciaDetalle({idSeguimiento: params.id});
    const [ incidenciaDetalle, setIncidenciaDetalle] = useState([]);
    
    const cargarData= ()=>{
        if (!isIncidenciaDetalleLoading) {
            setIncidenciaDetalle(aIncidenciaDetalle);
        }
    }

    useEffect(() => {
        cargarData();
    }, [incidenciaDetalle, isIncidenciaDetalleLoading]);

    

    if (isIncidenciaDetalleLoading) {
        return <div>Cargando ...</div>;
    }   
    console.log(incidenciaDetalle);
    //Funciones complementarias
    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;
        let list = items.map((element, index) => {
            return <div>{element.comentario}</div>;
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <Layout>
            <div className="">
                {
                    (!isIncidenciaDetalleLoading)  && 
                    <>
                        <IncidenciaDetalleCabecera data={incidenciaDetalle}/>
                        <DataView value={incidenciaDetalle} listTemplate={listTemplate} paginator rows={5} />            
                    </>
                }
                
            </div>
        </Layout>
    )
}

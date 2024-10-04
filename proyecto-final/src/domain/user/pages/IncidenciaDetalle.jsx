import React, { useState, useRef, useContext, useEffect  } from "react";
import { useLocation, useRoute   } from 'wouter';
import Layout from '../../shared/layout/Layout';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import useIncidenciaDetalle from "../../shared/services/useIncidenciaDetalle";
import IncidenciaDetalleCabecera from "../components/IncidenciaDetalleCabecera";
import { Dialog } from 'primereact/dialog';

export default function IncidenciaDetalle() {
    //Validacion si existe el parametro que se envia por get
    const [, navigate] = useLocation();
    const [match, params] = useRoute('/incidencias-detalle/:id');
    const [visible, setVisible] = useState(false);

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
    //Funciones complementarias
    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;
        let list = items.map((element, index) => {
            let clase = `contenedor-incidencias-comentario ${element.rol}`;

            return (
                <div key={index} className={clase}>
                    <div className="fila incidente-fecha">
                        <label>{element.fecha}</label>
                    </div>
                    <div className="fila seccion-comentario">
                        {element.comentario}
                    </div>
                </div>
                
            );
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };
930862165
    return (
        <Layout>
            <div className="listado-incidencias-detalle">
                {
                    (!isIncidenciaDetalleLoading)  && 
                    <>
                        <IncidenciaDetalleCabecera data={incidenciaDetalle}/>
                        <div className="acciones">
                            <Button icon="pi pi-plus" severity="info" aria-label="Notification"  onClick={() => setVisible(true)} />
                        </div>
                        <DataView value={incidenciaDetalle} listTemplate={listTemplate} paginator rows={5} />            
                    </>
                }
                <Dialog header="Agregar Comentario" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                    <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
                </Dialog>
            </div>
        </Layout>
    )
}

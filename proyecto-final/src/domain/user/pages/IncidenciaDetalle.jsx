import React, { useState, useRef, useContext, useEffect  } from "react";
import { useLocation, useRoute   } from 'wouter';
import Layout from '../../shared/layout/Layout';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import useIncidenciaDetalle from "../../shared/services/useIncidenciaDetalle";
import IncidenciaDetalleCabecera from "../components/IncidenciaDetalleCabecera";
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { AuthContext } from '../../shared/context/AuthContext';

export default function IncidenciaDetalle() {
    //Validacion si existe el parametro que se envia por get
    const [, navigate] = useLocation();
    const [match, params] = useRoute('/incidencias-detalle/:id');
    const [visible, setVisible] = useState(false);
    const [comentario, setComentario] = useState('');
    const {user} = useContext(AuthContext);

    if(!match){
        navigate("/incidencias");
    }
    //Proceso de obtener data desde el service
    const { aIncidenciaDetalle, isIncidenciaDetalleLoading, registrarIncidenciaDetalleMutation  } = useIncidenciaDetalle({idSeguimiento: params.id});
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
                        <label>{element.fecha} <b>{element.rol === 'ADMIN' && '- ADMIN'}</b></label>
                    </div>
                    <div className="fila seccion-comentario" dangerouslySetInnerHTML={{ __html: element.comentario }}/>
                </div>
                
            );
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    const handleGrabarComentario = async  ()=> {
        const data = {
            "incidencia_id": params.id,
            "comentario": comentario,
            "usuario_id":  user.id
        }
        await registrarIncidenciaDetalleMutation.mutateAsync({
            data:data
          });
          location.reload(true);
    }

    const footerContent = (
        <div>
            <Button label="Agregar" icon="pi pi-check" onClick={() =>{setVisible(false); handleGrabarComentario()}} autoFocus />
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
        </div>
    );

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
                <Dialog header="Agregar Comentario" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                    <Editor value={comentario} onTextChange={(e) => setComentario(e.htmlValue)} style={{ height: '320px' }} />
                </Dialog>
            </div>
        </Layout>
    )
}

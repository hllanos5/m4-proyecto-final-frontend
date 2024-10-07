import React, { useState, useRef, useContext, useEffect  } from "react";
import Layout from '../../shared/layout/Layout';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Accordion, AccordionTab } from 'primereact/accordion';
import useUsuario from "../../shared/services/useUsuario";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

export default function Usuario() {
    const { aUsuario, isUsuarioLoading , registrarUsuarioMutation} = useUsuario();
    const [ usuarios, setUsuarios] = useState([]);
    const [ usuariosFiltros, setUsuariosFiltros] = useState([]);
    const [ tituloUsuario, setTituloUsuario] = useState("Agregar Usuario");
    const [ mensajeValidacion, setMensajeValidacion] = useState("");
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const [selectedRol, setSelectedRol] = useState(null);
    const roles = [
        { name: 'ADMIN', code: 'ADMIN' },
        { name: 'RESIDENTE', code: 'RESIDENTE' }
    ];

    const cargarData= ()=>{
        if (!isUsuarioLoading) {
            setUsuarios(aUsuario);
            setUsuariosFiltros(aUsuario);
        }
    }

    const handleFiltrarUsuario = async (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        setUsuariosFiltros(usuarios.filter(element => {
            if(nombre === ""){
                return element;
            }
            return (nombre && element.nombre.includes(nombre))
        }));

    }

    const handleGrabarUsuario = async(e) => {
        e.preventDefault();
        let data = {};
        let rol = "";
        switch (e.target.rol.value) {
            case "0":
                rol = "ADMIN"
                break;
            case "1":
                rol = "RESIDENTE"
                break;
        }

        data.rol =rol
        data.nombre = e.target.nombre.value
        data.paterno = e.target.paterno.value
        data.materno = e.target.materno.value
        data.telefono = parseInt(e.target.telefono.value)
        data.correo = e.target.correo.value
        data.password = e.target.contrasena.value
        data.imagen = "imagen.jpg"

        //Validacion de datos del crear usuario formulario    
        if(!(data.rol.length>0) || !(data.nombre.length>0) || !(data.paterno.length>0) || !(data.materno.length>0
            || !(data.telefono.length>0) || !(data.correo.length>0) || !(data.password.length>0)
        )){
            setMensajeValidacion("Faltan Datos")
            showError();
            return false;
        }
        //Validacion de contraseña
         let pattern  = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{8,}$/
        if(!pattern.test(data.password)){
            setMensajeValidacion("Verificar Contraseña")
            showError();
            return false;
        }

        //Validacion de correo
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regex.test(data.correo)){
            setMensajeValidacion("Correo no válido")
            showError();
            return false;
        }

        await registrarUsuarioMutation.mutateAsync({
            data:data
        })
        location.reload(true);
    }

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:mensajeValidacion, life: 3000});
    }

    useEffect(() => {
        cargarData();
    }, [aUsuario, isUsuarioLoading]);


    return (
        <Layout>
            <div className='listado-usuarios'>
                <h1>Listado de Usuarios</h1>        
                <Accordion activeIndex={0} className="usuario-filtros-card">
                    <AccordionTab header="Filtros">
                        <form onSubmit={handleFiltrarUsuario} className="frm-usuario-mantenedor">
                            <div className="fila">
                                <label htmlFor="">Nombre:</label>
                                <InputText id="nombre" className="p-inputtext-sm" name="nombre"/>
                            </div>
                            <div className="fila boton-filtro" >
                                <Button label="Buscar" type="submit" style={{ width: '12rem', float:"rigth"}}/>
                            </div>
                        </form>
                    </AccordionTab>
                </Accordion>
                <div className="acciones">
                        <Button icon="pi pi-plus" severity="info" aria-label="Notification"  onClick={() => setVisible(true)} />
                </div>
                <DataTable value={usuariosFiltros} tableStyle={{ minWidth: '50rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                    <Column field="id" header="Id" style={{ width: '10%' }}></Column>
                    <Column field="nombres" header="Nombres" style={{ width: '20%' }}></Column>
                    <Column field="telefono" header="Telefono" style={{ width: '20%' }}></Column>
                    <Column field="correo" header="correo" style={{ width: '10%' }} ></Column>
                    <Column header="Opciones" style={{ width: '20%' }} ></Column>
                </DataTable>
            </div>
            <Dialog header={tituloUsuario} visible={visible} style={{ width: '30vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                <form onSubmit={handleGrabarUsuario} className="frm-usuario-mantenedor">
                    <div className="fila">
                        <label>Rol: </label>
                        <Dropdown value={selectedRol} onChange={(e) => setSelectedRol(e.value)} options={roles} optionLabel="name" 
                                placeholder="Seleccione Rol" className="p-inputtext-sm" name="rol"/>
                    </div>
                    <div className="fila">
                        <label>Nombre: </label>
                        <InputText id="nombre" className="p-inputtext-sm" name="nombre"/>
                    </div>
                    <div className="fila">
                        <label>Paterno: </label>
                        <InputText id="paterno" className="p-inputtext-sm" name="paterno"/>
                    </div>
                    <div className="fila">
                        <label>Materno: </label>
                        <InputText id="materno" className="p-inputtext-sm" name="materno"/>
                    </div>
                    <div className="fila">
                        <label>Telefono: </label>
                        <InputText id="telefono" className="p-inputtext-sm" name="telefono"/>
                    </div>
                    <div className="fila">
                        <label>Correo: </label>
                        <InputText id="correo" className="p-inputtext-sm" name="correo"/>
                    </div>
                    <div className="fila">
                        <label>Contraseña: </label>
                        <InputText id="contrasena" className="p-inputtext-sm" name="contrasena" type="password"/>
                    </div>
                    <div className="botones">
                        <Button label="Agregar" icon="pi pi-check" type="submit" autoFocus />
                        <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
                    </div>
                </form>
            </Dialog>
            <Toast ref={toast} />
        </Layout>
    )
}

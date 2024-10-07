import axios from 'axios';

export const listarIncidenciaDetalle =async ({idSeguimiento}) =>{
    console.log(idSeguimiento);
    const res = await axios.get('http://localhost:3000/api/incidencia-seguimiento/incidencia/'+idSeguimiento);
    return res.data;
}

export const registrarIncidenciaDetalle =async ({data}) =>{
    const res = await axios.post('http://localhost:3000/api/incidencia-seguimiento', data);
    return res.data;
}
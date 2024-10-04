import axios from 'axios';

export const listarIncidenciaDetalle =async ({idSeguimiento}) =>{
    const res = await axios.get('http://localhost:3000/api/incidencia-seguimiento/incidencia/'+idSeguimiento);
    return res.data;
}

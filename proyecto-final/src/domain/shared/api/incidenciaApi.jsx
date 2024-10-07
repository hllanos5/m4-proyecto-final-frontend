import axios from 'axios';

export const listarIncidencia =async token =>{
    const res = await axios.get('http://localhost:3000/api/incidencia',{
        headers: { Authorization: token },
    });
    return res.data;
}

export const registrarIncidencia =async ({data}) =>{
    const res = await axios.post('http://localhost:3000/api/incidencia',data);
    return res.data;
}

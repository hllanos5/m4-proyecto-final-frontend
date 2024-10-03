import axios from 'axios';

export const listarIncidencia =async () =>{
    const res = await axios.get('http://localhost:3000/api/incidencia');
    return res.data;
}

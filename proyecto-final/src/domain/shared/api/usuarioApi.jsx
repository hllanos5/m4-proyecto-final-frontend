import axios from 'axios';

export const listarUsuario =async () =>{
    const res = await axios.get('http://localhost:3000/api/user');
    return res.data;
}

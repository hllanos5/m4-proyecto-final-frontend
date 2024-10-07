import axios from 'axios';

export const listarUsuario =async () =>{
    const res = await axios.get('http://localhost:3000/api/user');
    return res.data;
}


export const registrarUsuario =async ({data}) =>{
    console.log(data);
    const res = await axios.post('http://localhost:3000/api/user', data);
    return res.data;
}

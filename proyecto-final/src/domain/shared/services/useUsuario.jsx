import { useMutation, useQuery } from '@tanstack/react-query';
import { listarUsuario} from '../api/usuarioApi';

function useUsuario() {
  
  const { data: aUsuario, isLoading: isUsuarioLoading } = useQuery({
    queryKey: ['usuario-listar'],
    queryFn: () => listarUsuario()
  });

  return {
    aUsuario,
    isUsuarioLoading
  };
}

export default useUsuario;

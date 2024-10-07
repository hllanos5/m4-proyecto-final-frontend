import { useMutation, useQuery } from '@tanstack/react-query';
import { listarUsuario, registrarUsuario} from '../api/usuarioApi';

function useUsuario() {
  
  const { data: aUsuario, isLoading: isUsuarioLoading } = useQuery({
    queryKey: ['usuario-listar'],
    queryFn: () => listarUsuario()
  });

  const registrarUsuarioMutation = useMutation({
    mutationKey: ['usuario-registrar'],
    mutationFn: registrarUsuario,
    onError: err => console.log('Error al registrar usuario', err),
    onSuccess: () => {
    },
  });

  return {
    aUsuario,
    isUsuarioLoading,
    registrarUsuarioMutation
  };
}

export default useUsuario;

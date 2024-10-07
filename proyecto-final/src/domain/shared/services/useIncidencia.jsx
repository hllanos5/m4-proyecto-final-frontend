import { useMutation, useQuery } from '@tanstack/react-query';
import { listarIncidencia, registrarIncidencia } from '../api/incidenciaApi';

function useIncidencia() {
  
  const { data: aIncidencia, isLoading: isIncidenciaLoading } = useQuery({
    queryKey: ['incidencia'],
    queryFn: () => listarIncidencia()
  });

  const registrarIncidenciaMutation = useMutation({
    mutationKey: ['incidencia-registrar'],
    mutationFn: registrarIncidencia,
    onError: err => console.log('Error al registrar incidencia', err),
    onSuccess: () => {
    },
  });


  return {
    aIncidencia,
    isIncidenciaLoading,
    registrarIncidenciaMutation
  };
}

export default useIncidencia;

import { useMutation, useQuery } from '@tanstack/react-query';
import { listarIncidencia } from '../api/incidenciaApi';

function useIncidencia() {
  
  const { data: aIncidencia, isLoading: isIncidenciaLoading } = useQuery({
    queryKey: ['incidencia'],
    queryFn: () => listarIncidencia()
  });


  return {
    aIncidencia,
    isIncidenciaLoading
  };
}

export default useIncidencia;

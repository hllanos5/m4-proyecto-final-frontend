import { useMutation, useQuery } from '@tanstack/react-query';
import { listarIncidenciaDetalle } from '../api/incidenciaDetalleApi';

function useIncidenciaDetalle(incidenciaId) {
  console.log(incidenciaId);
  const { data: aIncidenciaDetalle, isLoading: isIncidenciaDetalleLoading } = useQuery({
    queryKey: ['incidencia-detalle'],
    queryFn: () => listarIncidenciaDetalle(incidenciaId)
  });


  return {
    aIncidenciaDetalle,
    isIncidenciaDetalleLoading
  };
}

export default useIncidenciaDetalle;

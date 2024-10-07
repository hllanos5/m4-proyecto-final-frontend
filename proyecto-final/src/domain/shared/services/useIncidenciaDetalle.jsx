import { useMutation, useQuery } from '@tanstack/react-query';
import { listarIncidenciaDetalle, registrarIncidenciaDetalle } from '../api/incidenciaDetalleApi';

function useIncidenciaDetalle(incidenciaId) {
  
  const { data: aIncidenciaDetalle, isLoading: isIncidenciaDetalleLoading } = useQuery({
    queryKey: ['incidencia-detalle'],
    queryFn: () => listarIncidenciaDetalle(incidenciaId)
  });

 

  const registrarIncidenciaDetalleMutation = useMutation({
    mutationKey: ['incidencia-detalle-registrar'],
    mutationFn: registrarIncidenciaDetalle,
    onError: err => console.log('Error al registrar comentario', err),
    onSuccess: () => {
    },
  });

  return {
    aIncidenciaDetalle,
    isIncidenciaDetalleLoading,
    registrarIncidenciaDetalleMutation,
  };
}

export default useIncidenciaDetalle;

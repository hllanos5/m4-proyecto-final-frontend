import React, { useState, useRef, useContext, useEffect  } from "react";
import { useMutation, useQuery } from '@tanstack/react-query';
import { listarIncidencia, registrarIncidencia } from '../api/incidenciaApi';
import { AuthContext } from '../../shared/context/AuthContext';

function useIncidencia() {
  const authToken = localStorage.getItem('authToken');
  
  const { data: aIncidencia, isLoading: isIncidenciaLoading } = useQuery({
    queryKey: ['incidencia'],
    queryFn: () => listarIncidencia(authToken)
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

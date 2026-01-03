import { useContext, useEffect, useRef } from 'react';
import { LoadingContext } from '@/providers/LoadingProvider';

export const useLoading = (initialLoading?: boolean) => {
  const context = useContext(LoadingContext);
  const isFirstRender = useRef(true);

  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }

  const { showLoading } = context;

  useEffect(() => {
    if (initialLoading) {
      showLoading();
    }
    isFirstRender.current = false;
  }, [initialLoading, showLoading]);

  const isLoading =
    isFirstRender.current && initialLoading !== undefined ? initialLoading : context.isLoading;

  return { ...context, isLoading };
};

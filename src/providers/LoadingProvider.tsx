import { createContext, useState, useCallback, type ReactNode } from 'react';
import { Loading } from '@/components/ui';

interface LoadingContextType {
  isLoading: boolean;
  showLoading: (tip?: string) => void;
  hideLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tip, setTip] = useState<string | undefined>(undefined);

  const showLoading = useCallback((loadingTip?: string) => {
    if (loadingTip) setTip(loadingTip);
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
    setTip(undefined);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {isLoading && <Loading type="page" tip={tip} />}
    </LoadingContext.Provider>
  );
};

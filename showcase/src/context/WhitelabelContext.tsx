import React, { createContext, useContext, useState } from 'react';
import { WHITELABEL_CONFIGS, resolveBankId, type WhitelabelConfig } from '../config/whitelabel';

const WhitelabelContext = createContext<WhitelabelConfig | null>(null);

export const WhitelabelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config] = useState<WhitelabelConfig>(() => WHITELABEL_CONFIGS[resolveBankId()]);

  return <WhitelabelContext.Provider value={config}>{children}</WhitelabelContext.Provider>;
};

export function useWhitelabel(): WhitelabelConfig {
  const config = useContext(WhitelabelContext);
  if (!config) {
    throw new Error('useWhitelabel must be used within a WhitelabelProvider');
  }
  return config;
}

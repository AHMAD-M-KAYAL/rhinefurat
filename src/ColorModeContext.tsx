import React from 'react';

export type ColorMode = 'light' | 'dark';

export const ColorModeContext = React.createContext<{
  mode: ColorMode;
  toggleColorMode: () => void;
}>({ mode: 'light', toggleColorMode: () => {} });


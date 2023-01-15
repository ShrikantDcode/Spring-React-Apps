import { createContext } from 'react';

const AppContext = createContext({
  pnlData: [],
  loading: false,
  profile: undefined,
});

export default AppContext;

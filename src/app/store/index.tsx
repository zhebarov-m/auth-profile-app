import { createContext, useContext } from 'react';
import { AuthUserModel } from '../../entities/auth';

class Store {
    authStore = new AuthUserModel();
}

export const store = new Store();

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);

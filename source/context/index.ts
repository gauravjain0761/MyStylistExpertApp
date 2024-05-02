import {createContext} from 'react';
import {UserDetail} from 'types';

export const AppContext = createContext<{
  isLogin: string;
  loading: boolean;
  activeRoute: string;
  userDetails: UserDetail;
  setUserDetails: (param: UserDetail) => void;
  setActiveRoute: (param: string) => void;
  setIsLogin: (param: string) => void;
  setLoading: (param: boolean) => void;
}>({
  isLogin: '',
  loading: false,
  activeRoute: 'Home',
  userDetails: {} as UserDetail,
  setUserDetails: () => {},
  setActiveRoute: () => {},
  setIsLogin: () => {},
  setLoading: () => {},
});

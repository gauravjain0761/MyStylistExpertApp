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
  setLocation: (param: string) => void;
  location:{}
}>({
  isLogin: '',
  loading: false,
  activeRoute: 'Home',
  userDetails: {} as UserDetail,
  location:{},
  setUserDetails: () => {},
  setActiveRoute: () => {},
  setIsLogin: () => {},
  setLoading: () => {},
  setLocation:()=>{}
});

import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import RootSaga from './sagas';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const middleware = [thunk];
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({reducer: rootReducer, middleware: middleware});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

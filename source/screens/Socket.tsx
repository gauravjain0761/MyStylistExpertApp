import io from 'socket.io-client';
import {appConfig} from '../../config';

let socket: any = null;
export {socket};

const {mainDomain} = appConfig;

export const socketConnect = (dispatch: any, userId = '10') => {
  if (socket !== null) {
    socket.disconnect();
  }
  console.log('trying to connect');
  socket = io(mainDomain);
  socket.on('connect', () => {
    console.log('-----------socket connected-----------', socket?.id);
    // dispatch({ type: 'SOCKET_CONNECTION', payload: socket.connected, socket: socket })
    // next(socket.connected)
  });

  socket.on('receive_message', (res: any) => {
    console.log('receive_message', res);
  });

  socket.on('past_messages', (data: any) => {
    console.log('past_messages', data);
  });

  socket.on('send_message', (res: any) => {
    console.log('send_message', res);
  });
  socket.on('user_online', (res: any) => {
    console.log('user_online---', res);
  });
  socket.on('user_offline', (res: any) => {
    console.log('user_offline---', res);
  });
  socket.on('update_online_users', (res: any) => {
    console.log('update_online_users---', res);
  });

  socket.on('disconnect', () => {
    console.log('-----------socket disconnect-----------', socket);
  });
};

import { useEffect } from 'react';
import io from 'socket.io-client';

let socket;

const useSocket = () => {
  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));

    socket = io.connect(
      'https://khdev.tuitify.com/',
      {
        extraHeaders: { Authorization: `Bearer ${LoginData?.access_token}` },
      },
      { reconnect: true },
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;

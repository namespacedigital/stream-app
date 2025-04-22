import { useEffect, useRef, useState } from 'react';

export default function ServerStats() {
  const connection = useRef<WebSocket | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState(null);

  useEffect(() => {
    console.log('here');
    const socket = new WebSocket('ws://127.0.0.1:8090/chat/newroom');
    // Connection opened
    // socket.addEventListener('open', (event) => {
    //   socket.send('Connection established');
    // });
    //
    // // Listen for messages
    // socket.addEventListener('message', (event) => {
    //   console.log('Message from server ', event.data);
    // });

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => setIsReady(false);
    socket.onmessage = (event) => setVal(event.data);

    connection.current = socket;

    // if (connection.current !== null) {
    //   return connection.current.close();
    // }
  }, []);

  return <div>{isReady && <>{val}</>}</div>;
}

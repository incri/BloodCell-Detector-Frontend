import { useEffect, useState } from 'react';

export const useWebSocket = () => {
  const [progress, setProgress] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

  useEffect(() => {
    const socketUrl = `ws://127.0.0.1:8000/ws/progress/`;
    console.log(`Connecting to WebSocket at ${socketUrl}`);
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      setConnectionStatus('connected');
    };
    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setConnectionStatus('disconnected');
    };
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('disconnected');
    };

    socket.onmessage = (event) => {
      console.log('Received WebSocket message:', event.data);
      try {
        const { message } = JSON.parse(event.data);
        console.log({message});
        // Set the new message directly, replacing the old message
        setProgress(message);
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
      }
    };

    return () => {
      console.log('Closing WebSocket connection');
      socket.close();
    };
  }, []);

  return { progress, connectionStatus };
};

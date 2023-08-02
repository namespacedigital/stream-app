import { PropsWithChildren } from 'react';
import './main.scss'

export default function Main({ children }: PropsWithChildren) {
  return (
    <main role='main' className='main'>
      {children}
    </main>
  );
}

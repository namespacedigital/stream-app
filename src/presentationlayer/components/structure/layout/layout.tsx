import { PropsWithChildren } from 'react';
import './layout.scss'

export default function Layout({ children }: PropsWithChildren) {
  return <div className='layout min-h-screen flex-col flex bg-black'>{children}</div>;
}

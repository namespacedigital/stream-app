import { PropsWithChildren } from 'react';
import Logo from '../../generic/logo/logo';
import Actions from '../../specific/actions/actions';
import Nav from '../../specific/nav/nav';
import  classNames from 'classnames';
import { useAtomValue } from '../../../../infrastructure/state/jotai';
import { isMenuOpen } from '../../../../infrastructure/menu';
import './header.scss';

export default function Header({ children }: PropsWithChildren) {

  const isMenuOpenState = useAtomValue(isMenuOpen);

  return (
    <header className='header'>
      <div
        className={classNames([
          'absolute min-w-[100vw] transition-all duration-300 flex justify-between bg-gray-800 opacity-0 hover:opacity-80 hover:top-0 h-24 -top-4',
          { 'opacity-80 top-0': isMenuOpenState },
        ])}
      >
        <div className='flex items-center'>
          <Logo />
          <Nav />
        </div>
        {children}
        <div className='flex'>
          <Actions />
        </div>
      </div>
    </header>
  );
}

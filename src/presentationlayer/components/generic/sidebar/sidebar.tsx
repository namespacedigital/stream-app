import React, { PropsWithChildren, useEffect, useState } from 'react';
import classNames from 'classnames';
import { CloseIcon } from '../icons/icons';
import './sidebar.scss';

interface SidebarProps extends PropsWithChildren {
  readonly openSidebarCallback: CallableFunction;
}
export function Sidebar({ openSidebarCallback, children }: SidebarProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarAnimationRunning, setIsSidebarAnimationRunning] = useState(false);
  const animationDuration = 300;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    openSidebarCallback(setIsOpen);
  }, [openSidebarCallback]);

  function closeSidebar() {
    setIsOpen(false);
    setIsSidebarAnimationRunning(true);
    setTimeout(() => {
      setIsSidebarAnimationRunning(false);
    }, animationDuration);
  }
  return (
    <div className={classNames(['sidebar', { sidebar__hide: !isOpen && !isSidebarAnimationRunning }])}>
      <button onClick={closeSidebar} className='sidebar__button-overlay'></button>
      <div className='sidebar__content'>
        <div className={classNames(['sidebar__content__inner', { sidebar__content__inner__hide: isSidebarAnimationRunning || !isOpen }])}>
          <button
            className='hover:bg-default-green flex w-6 h-6 justify-center items-center transition duration-300 group border border-primary-900 rounded'
            type='button'
            onClick={() => closeSidebar()}
          >
            <CloseIcon className='group-hover:fill-white w-4 h-4 fill-primary-900' />
          </button>

          {children}
        </div>
      </div>
    </div>
  );
}

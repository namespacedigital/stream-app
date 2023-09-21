import { FocusContext, setFocus, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import './menu-item.scss';
import classNames from 'classnames';
import * as React from 'react';
import { useEffect } from 'react';

interface MenuItemProps {
  label: string;
  setNav: React.Dispatch<React.SetStateAction<string>>;
  nav: string;
}

export function MenuItem({ label, nav, setNav }: MenuItemProps) {
  const { ref, focused } = useFocusable({ focusKey: label });
  const handleMenu = (item: string) => {
    setFocus(item);
  };

  useEffect(() => {
    if (focused) {
      setNav(label);
    }
  }, [focused, setNav, label, nav]);

  return (
    <FocusContext.Provider value={label}>
      <li
        ref={ref}
        className={classNames([
          'movie-menu-item',
          { 'movie-menu-item__selected': nav === label && !focused },
          { 'movie-menu-item__focused': focused },
        ])}
      >
        <button type='button' onClick={() => handleMenu(label)}>
          {label}
        </button>
      </li>
    </FocusContext.Provider>
  );
}

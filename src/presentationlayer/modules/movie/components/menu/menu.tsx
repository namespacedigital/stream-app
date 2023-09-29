import * as React from 'react';
import { useEffect, useState } from 'react';
import { FocusContext, init, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { MenuItem } from './menu-item';
import classNames from 'classnames';
import './menu.scss';
import { useAtomValue } from '../../../../../infrastructure/state/jotai';
import { isMovieOpened } from '../../../../../infrastructure/state/movie';

init({
  debug: false,
  visualDebug: false,
});

interface MenuProps {
  focusKey: string;
  items: string[];
}

export function Menu({ focusKey: focusKeyParam, items }: MenuProps) {
  const [nav, setNav] = useState('');
  const isMoviePausedState = useAtomValue(isMovieOpened);
  const {
    ref,
    focusSelf,
    hasFocusedChild,
    focusKey,
    //setFocus -- to set focus manually to some focusKey
    // navigateByDirection, -- to manually navigate by direction
    // pause, -- to pause all navigation events
    // resume, -- to resume all navigation events
    // updateAllLayouts -- to force update all layouts when needed
  } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam,
    preferredChildFocusKey: undefined,
    onEnterPress: () => {},
    onEnterRelease: () => {},
    onArrowPress: () => true,
    onFocus: () => {},
    onBlur: () => {},
    extraProps: { foo: 'bar' },
  });

  useEffect(() => {
    focusSelf();
    // setFocus('Seriale');
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        className={classNames([
          'movie-menu',
          { 'movie-menu__has-focus-child': hasFocusedChild },
          { 'movie-menu__playing': isMoviePausedState },
        ])}
        ref={ref}
      >
        <h1>Logo</h1>
        <ul>
          {items.map((item) => (
            <MenuItem key={item} label={item} setNav={setNav} nav={nav} />
          ))}
        </ul>
      </div>
    </FocusContext.Provider>
  );
}

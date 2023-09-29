import {
  FocusableComponentLayout,
  FocusContext,
  FocusDetails,
  KeyPressDetails,
  setFocus,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import classNames from 'classnames';
import './asset.scss';
import * as React from 'react';
import { FilmIcon } from '../../../../components/generic/icons/icons';
import { Movie } from '../../../../../domain/movie/movies/Movie';
import { APIS } from '../../../../../infrastructure/state/config';

interface AssetProps {
  movie: Movie;
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (layout: FocusableComponentLayout, props: object, details: FocusDetails) => void;
}

export function Asset({ movie, onEnterPress, onFocus }: AssetProps) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus,
    focusKey: movie.id,
    extraProps: movie,
  });

  const handleMenu = (item: string) => {
    setFocus(item);
    onEnterPress(movie, { pressedKeys: {} });
  };

  return (
    <FocusContext.Provider value={movie.id}>
      <div className='asset' ref={ref} data-testid='asset'>
        <button type='button' onClick={() => handleMenu(movie.id)}>
          {movie.posterLink !== 'N/A' && (
            <img
              className={classNames(['asset__box', { asset__box__focused: focused }])}
              src={`${APIS.API_URL}${movie.posterLink}`}
              alt={movie.title}
            />
          )}
          {movie.posterLink === 'N/A' && (
            <div className={classNames(['asset__box asset__box__film-icon', { asset__box__focused: focused }])}>
              <FilmIcon data-testid='asset-box' />
              <span className='asset__title'>{movie.title}</span>
            </div>
          )}
        </button>
      </div>
    </FocusContext.Provider>
  );
}

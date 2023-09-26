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
    focusKey: movie.title,
    extraProps: {
      title: movie.title,
      posterLink: movie.posterLink,
    },
  });

  const handleMenu = (item: string) => {
    setFocus(item);
  };

  return (
    <FocusContext.Provider value={movie.title}>
      <div className='asset' ref={ref} data-testid='asset'>
        <button type='button' onClick={() => handleMenu(movie.title)}>
          {movie.posterLink !== 'N/A' && (
            <img
              className={classNames(['asset__box', { asset__box__focused: focused }])}
              src={`${APIS.API_URL}${movie.posterLink}`}
              alt={movie.title}
            />
          )}
          {movie.posterLink === 'N/A' && (
            <FilmIcon className={classNames(['asset__box', { asset__box__focused: focused }])} data-testid='asset-box' />
          )}

          <span className='asset__title'>{movie.title}</span>
        </button>
      </div>
    </FocusContext.Provider>
  );
}

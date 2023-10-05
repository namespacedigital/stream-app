import * as React from 'react';
import { FocusContext, init, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { ContentRow } from './content-row';

import './content.scss';
import { Movie } from '../../../../../domain/movie/movies/Movie';
import { APIS } from '../../../../../infrastructure/state/config';
import { CloseIcon, NavigateLeft, NavigateRight, PlayIcon } from '../../../../components/generic/icons/icons';
import classNames from 'classnames';
import { useAtom, useAtomValue } from '../../../../../infrastructure/state/jotai';
import { isMovieOpened, isMoviePaused, movieVideoPlayer } from '../../../../../infrastructure/state/movie';

init({
  debug: false,
  visualDebug: false,
});

interface ContentProps {
  focusKey: string;
  readonly handleSelectMovie: (movie: Movie | null) => void;

  rows: {
    title: string;
    assets: Movie[];
  }[];
}

export function Content({ rows, focusKey: focusKeyParam, handleSelectMovie }: ContentProps) {
  const [isMoviePausedState, setIsMoviePausedState] = useAtom(isMoviePaused);
  const movieVideoPlayerState = useAtomValue(movieVideoPlayer);

  const [isMovieOpenedState, setIsMovieOpenedState] = useAtom(isMovieOpened);
  const { ref, focusKey } = useFocusable({
    focusKey: focusKeyParam,
  });

  const [selectedAsset, setSelectedAsset] = React.useState<Movie | null>(null);

  const onAssetPress = React.useCallback((asset: any) => {
    setSelectedAsset(asset);
  }, []);

  const onRowFocus = React.useCallback(
    ({ y }: any) => {
      if (ref.current) {
        ref.current.scrollTop = y;
        ref.current.style.scrollBehavior = 'smooth';
      }
    },
    [ref],
  );
  return (
    <FocusContext.Provider value={focusKey}>
      <div
        className={classNames([
          'content',
          { content__playing: !isMoviePausedState && isMovieOpenedState },
          { content__paused: isMoviePausedState && isMovieOpenedState },
        ])}
      >
        {selectedAsset && (
          <div
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0) 20%,
        rgba(0,0,0,1)), url('${APIS.API_URL}${selectedAsset.posterLink}')`,
            }}
            className={classNames([
              'content__selected-item',
              { 'content__selected-item__paused': isMoviePausedState },
              { 'content__selected-item__playing': isMovieOpenedState && !isMoviePausedState },
            ])}
          >
            <div className='content__selected-item__poster' />
            <span className='content__selected-item__title' data-testid='selected-title'>
              {selectedAsset.title}
            </span>

            <div className='content__selected-item__play'>
              <button
                type='button'
                onClick={() => {
                  handleSelectMovie(selectedAsset);

                  setIsMovieOpenedState(true);
                  setIsMoviePausedState(false);
                  if (movieVideoPlayerState !== null && isMoviePausedState) {
                    movieVideoPlayerState.play();
                  }
                }}
              >
                <PlayIcon className='content__selected-item__play__button__icon' />
              </button>
            </div>
            {isMovieOpenedState && (
              <button
                type='button'
                onClick={() => {
                  setIsMovieOpenedState(false);
                  setIsMoviePausedState(false);
                  handleSelectMovie(null);
                }}
              >
                <CloseIcon className='content__selected-item__close' />
              </button>
            )}
          </div>
        )}
        <div className='content__navigate'>
          <NavigateLeft className='content__navigate__arrow' />
          <div className='content__scrolling-rows' ref={ref}>
            <div>
              {rows.map(({ title, assets }) => (
                <ContentRow assets={assets} key={title} title={title} onAssetPress={onAssetPress} onFocus={onRowFocus} />
              ))}
            </div>
          </div>
          <NavigateRight className='content__navigate__arrow' />
        </div>
      </div>
    </FocusContext.Provider>
  );
}

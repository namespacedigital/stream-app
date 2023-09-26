import * as React from 'react';
import { FocusContext, init, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { ContentRow } from './content-row';

import './content.scss';
import { Movie } from '../../../../../domain/movie/movies/Movie';
import { APIS } from '../../../../../infrastructure/state/config';

init({
  debug: false,
  visualDebug: false,
});

interface ContentProps {
  focusKey: string;
  rows: {
    title: string;
    assets: Movie[];
  }[];
}

export function Content({ rows, focusKey: focusKeyParam }: ContentProps) {
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
      <div className='content'>
        {selectedAsset && (
          <div
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0) 20%,
        rgba(0,0,0,1)), url('${APIS.API_URL}${selectedAsset.posterLink}')`,
            }}
            className='content__selected-item'
          >
            <span className='content__selected-item__title' data-testid='selected-title'>
              {selectedAsset.title}
            </span>
          </div>
        )}
        <div className='content__scrolling-rows' ref={ref}>
          <div>
            {rows.map(({ title, assets }) => (
              <ContentRow assets={assets} key={title} title={title} onAssetPress={onAssetPress} onFocus={onRowFocus} />
            ))}
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

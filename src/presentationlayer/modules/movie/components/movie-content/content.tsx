import * as React from 'react';
import { FocusContext, init, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { ContentRow } from './content-row';

import './content.scss';
import { IAsset } from './asset';
import classNames from 'classnames';

init({
  debug: false,
  visualDebug: false,
});

interface ContentProps {
  focusKey: string;
  rows: {
    title: string;
    assets: IAsset[];
  }[];
}

export function Content({ rows, focusKey: focusKeyParam }: ContentProps) {
  const { ref, focusKey } = useFocusable({
    focusKey: focusKeyParam,
  });

  const [selectedAsset, setSelectedAsset] = React.useState<IAsset | null>(null);

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
        <div className='content__selected-item'>
          <div
            className={classNames(['content__selected-item__box', { 'content__selected-item__box__selected': selectedAsset }])}
            color={selectedAsset ? selectedAsset.color : '#565b6b'}
            data-testid='selected-box'
          />
          <div className='content__selected-item__title' data-testid='selected-title'>
            {selectedAsset ? selectedAsset.title : 'Press "Enter" to select an asset'}
          </div>
        </div>
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

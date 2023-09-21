import * as React from 'react';
import './content-row.scss';
import {
  FocusableComponentLayout,
  FocusContext,
  FocusDetails,
  KeyPressDetails,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import { Asset, IAsset } from './asset';

interface ContentRowProps {
  title: string;
  assets: IAsset[];
  onAssetPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (layout: FocusableComponentLayout, props: object, details: FocusDetails) => void;
}

export function ContentRow({ title: rowTitle, assets, onAssetPress, onFocus }: ContentRowProps) {
  const { ref, focusKey } = useFocusable({
    onFocus,
  });

  const scrollingRef = React.useRef<HTMLDivElement>(null);

  const onAssetFocus = React.useCallback(
    ({ x }: any) => {
      if (scrollingRef.current) {
        scrollingRef.current.scrollLeft = x;
        scrollingRef.current.style.scrollBehavior = 'smooth';
      }
    },
    [scrollingRef],
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <div className='content-row' ref={ref}>
        <span className='content-row__title'>{rowTitle}</span>
        <div className='content-row__scrolling' ref={scrollingRef}>
          <div className='content-row__scrolling__content'>
            {assets.map(({ title, color }) => (
              <Asset key={title} title={title} color={color} onEnterPress={onAssetPress} onFocus={onAssetFocus} />
            ))}
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

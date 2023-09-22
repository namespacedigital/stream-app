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

export interface IAsset {
  title: string;
  color: string;
}

interface AssetProps {
  title: string;
  color: string;
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (layout: FocusableComponentLayout, props: object, details: FocusDetails) => void;
}

export function Asset({ title, color, onEnterPress, onFocus }: AssetProps) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus,
    focusKey: title,
    extraProps: {
      title,
      color,
    },
  });

  const handleMenu = (item: string) => {
    setFocus(item);
  };

  return (
    <FocusContext.Provider value={title}>
      <div className='asset' ref={ref} data-testid='asset'>
        <button type='button' onClick={() => handleMenu(title)}>
          <FilmIcon className={classNames(['asset__box', { asset__box__focused: focused }])} color={color} data-testid='asset-box' />
          <span className='asset__title'>{title}</span>
        </button>
      </div>
    </FocusContext.Provider>
  );
}

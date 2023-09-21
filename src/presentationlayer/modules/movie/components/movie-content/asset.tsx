import { FocusableComponentLayout, FocusDetails, KeyPressDetails, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import classNames from 'classnames';
import './asset.scss';

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
    extraProps: {
      title,
      color,
    },
  });

  return (
    <div className='asset' ref={ref} data-testid='asset'>
      <div className={classNames(['asset__box', { asset__box__focused: focused }])} color={color} data-testid='asset-box' />
      <span className='asset__title'>{title}</span>
    </div>
  );
}

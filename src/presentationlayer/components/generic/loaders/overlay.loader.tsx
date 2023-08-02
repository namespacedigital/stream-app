import './overlay.loader.scss';

export interface IOverlayLoader {
  opacity?: number;
}

export default function OverlayLoader({ opacity }: IOverlayLoader) {
  return (
    <div className='overlay-loader'>
      <div className='push-pop loader'>
        <div />
        <div />
      </div>

      <div
        className='overlay-loader__bg'
        style={{
          opacity: opacity !== undefined ? opacity / 100 : 1,
        }}
      />
    </div>
  );
}

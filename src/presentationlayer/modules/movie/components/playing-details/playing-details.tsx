import './movie.scss';
import { VideoPlayer } from '../../../../components/specific/player/VideoPlayer';
import { useRef } from 'react';
import videojs from 'video.js';
import { APIS } from '../../../../../infrastructure/state/config';
import { useSetAtom } from '../../../../../infrastructure/state/jotai';
import { isTopMenuOpen } from '../../../../../infrastructure/state/menu';
import '../../../../components/generic/spatial-navigation/spatial_navigation';

export default function PlayingDetails() {
  const playerRef = useRef<any>(null);
  const setIsMenuOpen = useSetAtom(isTopMenuOpen);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    controlBar: {
      fullscreenToggle: false,
      pictureInPictureToggle: false,
    },
    sources: [
      {
        src: APIS.API_URL + `/api/v1/movies/${'rick.mkv'}`,
        type: 'video/mp4',
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.tech_.off('dblclick');

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('pause', () => {
      setIsMenuOpen(true);
      videojs.log('player is paused');
    });

    player.on('play', () => {
      setIsMenuOpen(false);
      videojs.log('player is playing');
    });

    // player.on('play', () => {
    //   setTimeout(() => {
    //     setIsMenuOpenState(false);
    //   }, 3000);
    //   videojs.log('player will dispose');
    // });
  };

  return (
    <div className='playing-details'>
      <div className='playing-details__content'>
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
}

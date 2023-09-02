import './movie.scss';
import { VideoPlayer } from '../../components/specific/player/VideoPlayer';
import { useRef } from 'react';
import videojs from 'video.js';
import { APIS } from '../../../infrastructure/state/config';
import { useSetAtom } from '../../../infrastructure/state/jotai';
import { isTopMenuOpen } from '../../../infrastructure/state/menu';

export default function MoviePage() {
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
        src: APIS.API_URL + `/movies/${'test.mkv'}`,
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
    <div className='movie'>
      <div className='movie__content'>
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
}

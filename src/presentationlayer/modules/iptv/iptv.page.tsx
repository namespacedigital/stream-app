import { isMenuOpen } from '../../../infrastructure/state/menu';
import { useAtom, useSetAtom } from '../../../infrastructure/state/jotai';
import './iptv.scss';
import { useRef } from 'react';
import { APIS } from '../../../infrastructure/state/config';
import videojs from 'video.js';
import { VideoPlayer } from '../../components/specific/player/VideoPlayer';

export default function IptvPage() {
  const [isMenuOpenState, setIsMenuOpenState] = useAtom(isMenuOpen);
  const playerRef = useRef<any>(null);
  const setIsMenuOpen = useSetAtom(isMenuOpen);

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
        src: APIS.API_URL + `/udp.mkv`,
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
  const handleMenu = () => {
    setIsMenuOpenState(!isMenuOpenState);
  };
  return (
    <div className='movie'>
      <div className='movie__content'>
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
}

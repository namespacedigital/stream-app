import './movie.scss';
import { VideoPlayer } from '../../components/specific/player/VideoPlayer';
import { useRef } from 'react';
import videojs from 'video.js';

export default function MoviePage() {
  const playerRef = useRef<any>(null);

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
        src: 'http://192.168.1.138:8080/stream/test.mkv',
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

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <div className='movie'>
      <div className='movie__content'>
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
}

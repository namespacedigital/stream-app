import { useAtom } from '../../../infrastructure/state/jotai';
import './iptv.scss';
import { useRef } from 'react';
import { APIS } from '../../../infrastructure/state/config';
import videojs from 'video.js';
import { VideoPlayer } from '../../components/specific/player/VideoPlayer';
import { useChangeTvProgramHook } from './components/hook/change-tv-program.hook';
import { tvProgram } from '../../../infrastructure/state/iptv';
import { TvProgram } from '../../../domain/iptv/tv-program/TvProgram';
import { CurrentTvProgram } from './components/current-program/current-tv-program';

export default function IptvPage() {
  const playerRef = useRef<any>(null);
  const [tvProgramState] = useAtom<TvProgram>(tvProgram);
  useChangeTvProgramHook();
  videojs.log(`tv program: ${tvProgramState}`);
  const videoJsOptions = {
    autoplay: true,
    controls: false,
    responsive: true,
    fluid: true,
    controlBar: false,
    sources: [
      {
        src: APIS.API_URL + `/udp.mkv`,
        // src: APIS.API_URL + `/movies/test.mkv`,
        type: 'video/mp4',
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.tech_.off('dblclick');

    // You can handle player events here, for example:
    player.on('waiting', () => {
      // const interval = setInterval(() => videojs.log('player is waiting'), 1000);
      videojs.log('player is waiting');
    });

    player.on('pause', () => {
      videojs.log('player is paused');
    });

    player.on('error', () => {
      videojs.log('player has error');
    });

    player.on('play', () => {
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
    <div className='iptv' onClick={() => console.log()}>
      <div className='iptv__content'>
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
      <CurrentTvProgram />
    </div>
  );
}

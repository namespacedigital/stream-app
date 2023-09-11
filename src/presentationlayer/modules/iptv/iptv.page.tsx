import { useSetAtom } from '../../../infrastructure/state/jotai';
import './iptv.scss';
import { useEffect, useRef } from 'react';
import { APIS } from '../../../infrastructure/state/config';
import videojs from 'video.js';
import { VideoPlayer } from '../../components/specific/player/VideoPlayer';
import { useChangeTvProgramHook } from './components/hook/change-tv-program.hook';
import { selectedTvProgram } from '../../../infrastructure/state/iptv';
import { CurrentTvProgram } from './components/current-program/current-tv-program';
import { getTvPrograms } from '../../../application/service/iptv/tv-program/get-tv-programs';

export default function IptvPage() {
  const playerRef = useRef<any>(null);
  const setSelectedTvProgram = useSetAtom(selectedTvProgram);

  const [tvProgram, setTvPrograms] = useChangeTvProgramHook();

  // console.log(tvProgram);

  videojs.log(`tv program: ${tvProgram}`);
  const videoJsOptions = {
    autoplay: true,
    controls: false,
    responsive: true,
    fluid: true,
    controlBar: false,
    sources: [
      {
        src: APIS.API_URL + `/api/v1/iptv/${tvProgram.programName}`,
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

  useEffect(() => {
    setSelectedTvProgram(tvProgram);
  }, [setSelectedTvProgram, tvProgram]);

  useEffect(() => {
    getTvPrograms().then((result) => {
      setTvPrograms(Object.keys(result));
      // console.log(Object.keys(result));
    });
  }, [setTvPrograms]);

  return (
    <div className='iptv' onClick={() => console.log()}>
      <div className='iptv__sidebar'>tv</div>
      <div className='iptv__content'>
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
      <CurrentTvProgram />
    </div>
  );
}

import { useAtom, useSetAtom } from '../../../infrastructure/state/jotai';
import './iptv.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { APIS } from '../../../infrastructure/state/config';
import videojs from 'video.js';
import { VideoPlayer } from '../../components/specific/player/VideoPlayer';
import { useChangeTvProgramHook } from './components/hook/change-tv-program.hook';
import { selectedTvProgram } from '../../../infrastructure/state/iptv';
import { CurrentTvProgram } from './components/current-program/current-tv-program';
import { getTvPrograms } from '../../../application/service/iptv/tv-program/get-tv-programs';
import { AxiosError } from 'axios';
import { TvProgramsSidebar } from './components/programs/tv-programs-sidebar';
import { KeyEventEnum } from '../../../domain/key/key-event.enum';
import { Sidebar } from '../../components/generic/sidebar/sidebar';
type Error = {
  readonly status?: number;
  readonly message: string;
};
export default function IptvPage() {
  const playerRef = useRef<any>(null);

  const setSelectedTvProgram = useSetAtom(selectedTvProgram);
  const [error, setError] = useState<Error | null>(null);
  const [tvProgram, setTvPrograms, tvPrograms] = useChangeTvProgramHook();

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

  const keyEventHandler = useCallback((event: KeyboardEvent) => {
    const key = event.key;
    if (key) {
      if (key === KeyEventEnum.Enter) {
        // setIsSidebarOpen(true);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', keyEventHandler);
    return () => {
      window.removeEventListener('keydown', keyEventHandler);
    };
  }, [keyEventHandler]);

  useEffect(() => {
    setSelectedTvProgram(tvProgram);
  }, [setSelectedTvProgram, tvProgram]);

  useEffect(() => {
    getTvPrograms()
      .then((result) => {
        setTvPrograms(Object.keys(result));
        setError(null);
        // console.log(Object.keys(result));
      })
      .catch((err: AxiosError) => {
        setError({ status: err.status, message: err.message });
      });
  }, [setTvPrograms]);

  let setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  const openSidebarCallback = (setIsOpenCallback: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsSidebarOpen = setIsOpenCallback;
  };

  return (
    <>
      <Sidebar openSidebarCallback={openSidebarCallback}>
        <TvProgramsSidebar tvPrograms={tvPrograms} />
      </Sidebar>
      {/*<TvProgramsSidebar tvPrograms={tvPrograms} />*/}
      <div onClick={() => setIsSidebarOpen(true)} className='iptv'>
        <div className='iptv__sidebar'></div>
        <div className='iptv__content'>
          {error !== null && (
            <span>
              {error.message} {error.status}
            </span>
          )}
          {error === null && <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />}
        </div>
        <CurrentTvProgram />
      </div>
    </>
  );
}

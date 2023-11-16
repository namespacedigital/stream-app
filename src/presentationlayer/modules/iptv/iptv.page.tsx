import { useAtom } from '../../../infrastructure/state/jotai';
import './iptv.scss';
import React, { useEffect, useRef, useState } from 'react';
import { APIS } from '../../../infrastructure/state/config';
import videojs from 'video.js';
import { VideoPlayer } from '../../components/specific/player/VideoPlayer';
import { useChangeTvProgramHook } from './components/hook/change-tv-program.hook';
import { CurrentTvProgram } from './components/current-program/current-tv-program';
import { getTvPrograms } from '../../../application/service/iptv/tv-program/get-tv-programs';
import { AxiosError } from 'axios';
import { TvProgramsSidebar } from './components/programs/tv-programs-sidebar';
import { Sidebar } from '../../components/generic/sidebar/sidebar';
import { selectedTvProgram } from '../../../infrastructure/state/iptv';
import { ExcludedPrograms } from '../../../domain/iptv/tv-program/excluded-programs';

const TIME_TO_UPDATE = 600;
type Error = {
  readonly status?: number;
  readonly message: string;
};
export default function IptvPage() {
  const playerRef = useRef<any>(null);
  const [selectedTvProgramState, setSelectedTvProgramState] = useAtom(selectedTvProgram);
  const [error, setError] = useState<Error | null>(null);
  const { tvProgram, setTvPrograms, enable, disable, tvPrograms } = useChangeTvProgramHook({});
  const timer = useRef<null | any>(null);
  const [delay, setDelay] = React.useState(false);

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.tech_.off('dblclick');

    // You can handle player events here, for example:
    player.on('waiting', () => {
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
    getTvPrograms()
      .then((result) => {
        setTvPrograms(
          Object.keys(result)
            .filter((program) => !ExcludedPrograms.includes(program))
            .sort(),
        );
        setError(null);
        // console.log(Object.keys(result));
      })
      .catch((err: AxiosError) => {
        setError({ status: err.status, message: err.message });
      });
  }, [setTvPrograms]);

  let setIsTvProgramsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  const openSidebarCallback = (setIsOpenCallback: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsTvProgramsSidebarOpen = setIsOpenCallback;
  };

  const closeSidebarCallback = () => {
    enable();
  };

  useEffect(() => {
    if (tvProgram && tvProgram.programName !== '') {
      timer.current = setTimeout(() => {
        setDelay(true);
      }, TIME_TO_UPDATE);
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [setSelectedTvProgramState, tvProgram]);

  useEffect(() => {
    if (tvProgram && tvProgram.programName !== '') {
      setSelectedTvProgramState(tvProgram);
      setDelay(false);
    }
  }, [setSelectedTvProgramState, tvProgram]);

  return (
    <>
      <Sidebar openSidebarCallback={openSidebarCallback} closeSidebarCallback={closeSidebarCallback}>
        <TvProgramsSidebar
          allTvPrograms={tvPrograms}
          callback={() => {
            setIsTvProgramsSidebarOpen(false);
            enable();
          }}
        />
      </Sidebar>
      <div
        onClick={() => {
          setIsTvProgramsSidebarOpen(true);
          disable();
        }}
        className='iptv'
      >
        <div className='iptv__sidebar'></div>
        <div className='iptv__content'>
          {error !== null && (
            <span>
              {error.message} {error.status}
            </span>
          )}
          {delay && error === null && selectedTvProgramState && selectedTvProgramState.programName && (
            <VideoPlayer
              options={{
                autoplay: true,
                controls: false,
                responsive: true,
                fluid: true,
                controlBar: false,
                sources: [
                  {
                    src: APIS.API_URL + `/api/v1/iptv/${selectedTvProgramState.programName}`,
                    // src: APIS.API_URL + `/movies/test.mkv`,
                    type: 'video/mp4',
                  },
                ],
              }}
              onReady={handlePlayerReady}
            />
          )}
        </div>
        <CurrentTvProgram />
      </div>
    </>
  );
}

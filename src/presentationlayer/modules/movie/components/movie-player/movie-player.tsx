import './movie-player.scss';
import { VideoPlayer } from '../../../../components/specific/player/VideoPlayer';
import * as React from 'react';
import { useRef } from 'react';
import videojs from 'video.js';
import { APIS } from '../../../../../infrastructure/state/config';
import { useSetAtom } from '../../../../../infrastructure/state/jotai';
import { Movie } from '../../../../../domain/movie/movies/Movie';
import { isMoviePaused, movieVideoPlayer } from '../../../../../infrastructure/state/movie';

interface PlayingDetailsProps {
  readonly movie: Movie | null | undefined;
}
export default function MoviePlayer({ movie }: PlayingDetailsProps) {
  const playerRef = useRef<any>(null);
  const setMovieVideoPlayer = useSetAtom(movieVideoPlayer);
  const setIsMoviePaused = useSetAtom(isMoviePaused);

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
        src: APIS.API_URL + movie?.movieLink,
        type: 'video/mp4',
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
    setMovieVideoPlayer(player);

    player.tech_.off('dblclick');

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('pause', () => {
      setIsMoviePaused(true);
      // setIsMenuOpen(true);
      videojs.log('player is paused');
    });

    player.on('play', () => {
      // setIsMenuOpen(false);
      setIsMoviePaused(false);
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
      <div className='playing-details__content'>{movie && <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />}</div>
    </div>
  );
}

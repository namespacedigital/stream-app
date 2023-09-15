import * as React from 'react';
import { useEffect, useRef } from 'react';
import videojs from 'video.js';

// Styles
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  readonly options: any;
  readonly onReady: CallableFunction;
}
export function VideoPlayer({ options, onReady }: VideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');

      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }

      const player = (playerRef.current = videojs(videoElement, options, () => {
        // videojs.log('player is ready');
        onReady && onReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      if (player) {
      }

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef, onReady]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

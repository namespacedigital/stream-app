import { useEffect, useState } from 'react';
import { APIS } from '../../../../../infrastructure/state/config';
import { Movie } from '../../../../../domain/movie/movies/Movie';

interface SubtitleHookProps {
  readonly movie?: Movie | null | undefined;
}
export function useSubtitleHook({ movie }: SubtitleHookProps): { subtitle: string | undefined } {
  const [subtitle, setSubtitle] = useState<string>();
  const srtToVTT = (src: string) => {
    const subtitle = {
      data: {
        src: src,
      },
      /**
       * Load the file from url
       *
       * @param src
       */
      load: function (src: string) {
        subtitle.data.src = src;

        if (subtitle.isSrt(subtitle.data.src)) {
          const client = new XMLHttpRequest();
          client.open('GET', subtitle.data.src);
          client.onreadystatechange = function () {
            console.log(subtitle.data.src);
            subtitle.convert(client.responseText).then(function (file) {
              subtitle.data.src = file;
              setSubtitle(subtitle.data.src);
            });
          };
          client.send();
        }
      },
      /**
       * Converts the SRT string to a VTT formatted string
       *
       * @param   {string}    content     - SRT string
       * @return  {object}    promise     - Returns a promise with the generated file as the return value
       */
      convert: function (content: string): Promise<string> {
        return new Promise(function (resolve, reject) {
          /**
           * Replace all (,) commas with (.) dots. Eg: 00:00:01,144 -> 00:00:01.144
           */
          content = content.replace(/(\d+:\d+:\d+)+,(\d+)/g, '$1.$2');
          content = 'WEBVTT - Generated using SRT2VTT\r\n\r\n' + content;

          /**
           * Convert content to a file
           */
          const blob = new Blob([content], { type: 'text/vtt' });
          const file = window.URL.createObjectURL(blob);

          resolve(file);
        });
      },
      isSrt: function (filename: string): boolean {
        return filename.split('.').pop()?.toLowerCase() === 'srt';
      },
      isVTT: function (filename: string) {
        return filename.split('.').pop()?.toLowerCase() === 'vtt';
      },
    };

    subtitle.load(src);
  };

  useEffect(() => {
    if (!movie) {
      console.log('no source');
      return;
    }

    srtToVTT(APIS.API_URL + movie.subtitleLink);
  }, [movie]);

  return { subtitle };
}

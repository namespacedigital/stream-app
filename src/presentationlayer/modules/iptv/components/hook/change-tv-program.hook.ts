import { useCallback, useEffect } from 'react';
import { useSetAtom } from '../../../../../infrastructure/state/jotai';
import { tvProgram } from '../../../../../infrastructure/state/iptv';

enum KeyEventEnum {
  ArrowUp,
  ArrowDown,
}

function toEnum(key: string): KeyEventEnum {
  return KeyEventEnum[key as keyof typeof KeyEventEnum];
}

export function useChangeTvProgramHook() {
  const setTvProgram = useSetAtom(tvProgram);
  /** order maters */

  const onKeyUp = useCallback(() => {
    setTvProgram({ programName: 'PRO TV' });
    // return event.preventDefault();
  }, [setTvProgram]);

  const onKeyDown = useCallback(() => {
    setTvProgram({ programName: 'Antena 1' });
    // return event.preventDefault();
  }, [setTvProgram]);

  const keyEventHandler = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      if (key) {
        if (toEnum(key) === KeyEventEnum.ArrowUp) {
          onKeyUp();
        }
        if (toEnum(key) === KeyEventEnum.ArrowDown) {
          onKeyDown();
        }
      }
    },
    [onKeyUp, onKeyDown],
  );

  useEffect(() => {
    window.addEventListener('keydown', keyEventHandler);
    return () => {
      window.removeEventListener('keydown', keyEventHandler);
    };
  }, [keyEventHandler]);
}

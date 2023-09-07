import { useCallback, useEffect, useReducer, useState } from 'react';
import { TvProgram } from '../../../../../domain/iptv/tv-program/TvProgram';

enum KeyEventEnum {
  ArrowUp,
  ArrowDown,
}

function toEnum(key: string): KeyEventEnum {
  return KeyEventEnum[key as keyof typeof KeyEventEnum];
}

export enum ActionTypeEnum {
  INCREMENT,
  DECREMENT,
  INCREMENT_RESET,
  DECREMENT_RESET,
}

type ActionType = {
  type: ActionTypeEnum;
};

type Payload = {
  count: number;
};

function tvProgramReducer(payload: Payload, action: ActionType) {
  switch (action.type) {
    case ActionTypeEnum.INCREMENT:
      return { ...payload, count: payload.count + 1 };
    case ActionTypeEnum.DECREMENT:
      return { ...payload, count: payload.count - 1 };
    case ActionTypeEnum.INCREMENT_RESET:
      return { ...payload, count: 0 };
    case ActionTypeEnum.DECREMENT_RESET:
      return { ...payload, count: 0 };

    default:
      console.log('breaking');
      break;
  }
  return payload;
}

export function useChangeTvProgramHook(): [TvProgram, CallableFunction] {
  const [tvPrograms, setTvPrograms] = useState<string[]>([]);
  const [tvProgram, setTvProgram] = useState<TvProgram>({ programName: '', count: 0 });
  const [state, dispatch] = useReducer(tvProgramReducer, { count: 0 });
  // const [cursor, setCursor] = useState(0);

  /** order maters */

  // console.log(tvPrograms.length);

  ///////////////https://codesandbox.io/s/react-hooks-navigate-list-with-keyboard-eowzo
  const onArrowUp = useCallback(() => {
    if (state.count < tvPrograms.length - 1) {
      dispatch({ type: ActionTypeEnum.INCREMENT });
    } else {
      dispatch({ type: ActionTypeEnum.INCREMENT_RESET });
    }
  }, [tvPrograms.length, state.count]);

  const onArrowDown = useCallback(() => {
    if (state.count > 0) {
      dispatch({ type: ActionTypeEnum.DECREMENT });
    } else {
      dispatch({ type: ActionTypeEnum.INCREMENT_RESET });
    }
  }, [state.count]);

  const keyEventHandler = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      if (key) {
        if (toEnum(key) === KeyEventEnum.ArrowUp) {
          onArrowUp();
        }
        if (toEnum(key) === KeyEventEnum.ArrowDown) {
          onArrowDown();
        }
      }
    },
    [onArrowUp, onArrowDown],
  );

  useEffect(() => {
    setTvProgram({ programName: tvPrograms[state.count], count: state.count });
  }, [state, tvPrograms]);

  useEffect(() => {
    window.addEventListener('keydown', keyEventHandler);
    return () => {
      window.removeEventListener('keydown', keyEventHandler);
    };
  }, [keyEventHandler]);

  return [tvProgram, setTvPrograms];
}

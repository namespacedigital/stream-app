import { useCallback, useEffect, useReducer, useState } from 'react';
import { TvProgram } from '../../../../../domain/iptv/tv-program/TvProgram';
import { KeyEventEnum } from '../../../../../domain/key/key-event.enum';

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
  length: number;
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
      return { ...payload, count: action.length };

    default:
      break;
  }
  return payload;
}

interface TvProgramHook {
  readonly tvProgram: TvProgram;
  readonly setTvPrograms: CallableFunction;
  readonly disable: CallableFunction;
  readonly enable: CallableFunction;
  readonly tvPrograms: string[];
}

export function useChangeTvProgramHook(): TvProgramHook {
  const [tvPrograms, setTvPrograms] = useState<string[]>([]);
  const [tvProgram, setTvProgram] = useState<TvProgram>({ programName: '', count: 0 });
  const [state, dispatch] = useReducer(tvProgramReducer, { count: 0 });

  ///////////////https://codesandbox.io/s/react-hooks-navigate-list-with-keyboard-eowzo
  const onArrowUp = useCallback(() => {
    if (state.count < tvPrograms.length - 1) {
      dispatch({ type: ActionTypeEnum.INCREMENT, length: tvPrograms.length });
    } else {
      dispatch({ type: ActionTypeEnum.INCREMENT_RESET, length: tvPrograms.length });
    }
  }, [tvPrograms.length, state.count]);

  const onArrowDown = useCallback(() => {
    if (state.count > 0) {
      dispatch({ type: ActionTypeEnum.DECREMENT, length: tvPrograms.length });
    } else {
      dispatch({ type: ActionTypeEnum.DECREMENT_RESET, length: tvPrograms.length - 1 });
    }
  }, [tvPrograms.length, state.count]);

  const keyEventHandler = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;

      //inverse actions to see the list navigation
      if (key) {
        if (key === KeyEventEnum.Down) {
          onArrowUp();
        } else if (key === KeyEventEnum.Up) {
          onArrowDown();
        } else if (toEnum(key) === KeyEventEnum.ArrowUp) {
          onArrowDown();
        } else if (toEnum(key) === KeyEventEnum.ArrowDown) {
          onArrowUp();
        }
      }
    },
    [onArrowUp, onArrowDown],
  );

  useEffect(() => {
    setTvProgram({ programName: tvPrograms[state.count], count: state.count });
  }, [state, tvPrograms]);

  const disable = () => {
    window.removeEventListener('keydown', keyEventHandler);
  };

  const enable = () => {
    window.addEventListener('keydown', keyEventHandler);
  };
  useEffect(() => {
    window.addEventListener('keydown', keyEventHandler);
    return () => {
      window.removeEventListener('keydown', keyEventHandler);
    };
  }, [keyEventHandler]);

  return { tvProgram, setTvPrograms, disable, enable, tvPrograms };
}

import { useEffect, useState } from 'react';
import './current-tv-program.scss';
import { useAtom } from '../../../../../infrastructure/state/jotai';
import { TvProgram } from '../../../../../domain/iptv/tv-program/TvProgram';
import { tvProgram } from '../../../../../infrastructure/state/iptv';
import useTimeout from '../../../../components/specific/hook/timeout.hook';

export function CurrentTvProgram() {
  const [tvProgramState] = useAtom<TvProgram>(tvProgram);
  const [isTvProgramDescOpen, setIsTvProgramDescOpen] = useState(false);

  const [timeout] = useTimeout(() => {
    setIsTvProgramDescOpen(false);
  }, 2000);

  timeout();

  useEffect(() => {
    if (tvProgramState.programName !== '') {
      setIsTvProgramDescOpen(true);
    }
  }, [tvProgramState]);
  return <>{isTvProgramDescOpen && <div className='current-tv-program__description'>{tvProgramState.programName}</div>}</>;
}

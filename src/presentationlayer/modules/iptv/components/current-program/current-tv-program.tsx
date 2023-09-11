import { useEffect, useState } from 'react';
import './current-tv-program.scss';
import { useAtom } from '../../../../../infrastructure/state/jotai';
import { TvProgram } from '../../../../../domain/iptv/tv-program/TvProgram';
import { selectedTvProgram } from '../../../../../infrastructure/state/iptv';
import useTimeout from '../../../../components/specific/hook/timeout.hook';

export function CurrentTvProgram() {
  const [selectedTvProgramState] = useAtom<TvProgram>(selectedTvProgram);
  const [isTvProgramDescOpen, setIsTvProgramDescOpen] = useState(false);

  const [timeout] = useTimeout(() => {
    setIsTvProgramDescOpen(false);
  }, 2000);

  timeout();

  useEffect(() => {
    if (selectedTvProgramState && selectedTvProgramState.programName !== '') {
      setIsTvProgramDescOpen(true);
    }
  }, [selectedTvProgramState]);
  return (
    <>
      {isTvProgramDescOpen && selectedTvProgramState && (
        <div className='current-tv-program__description'>
          <div>{selectedTvProgramState.programName}</div>
          <div>{selectedTvProgramState.count}</div>
        </div>
      )}
    </>
  );
}

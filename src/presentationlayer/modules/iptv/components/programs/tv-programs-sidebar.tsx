import './tv-programs-sidebar.scss';
import { useChangeTvProgramHook } from '../hook/change-tv-program.hook';
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAtom } from '../../../../../infrastructure/state/jotai';
import { selectedTvProgram } from '../../../../../infrastructure/state/iptv';
import PlayingLoader from '../../../../components/generic/loaders/playing.loader';
import { KeyEventEnum } from '../../../../../domain/key/key-event.enum';

interface TvProgramsProps {
  readonly allTvPrograms: string[];
  readonly callback: CallableFunction;
}

export function TvProgramsSidebar({ allTvPrograms, callback }: TvProgramsProps) {
  const [selectedTvProgramState, setSelectedProgramState] = useAtom(selectedTvProgram);
  const [programList, setProgramList] = useState<string[][]>([]);
  const [tvProgramSectionToDisplay, setTvProgramSectionToDisplay] = useState<string[]>([]);

  const { tvProgram, setTvPrograms } = useChangeTvProgramHook({ reverse: true });

  const getBiDimensionalTvPrograms = useCallback(() => {
    let biDimensionalProgramArray = [];

    for (let i = 0; i < allTvPrograms.length; i++) {
      if (i % 10 === 0) {
        biDimensionalProgramArray.push([allTvPrograms[i]]);
      } else {
        biDimensionalProgramArray[biDimensionalProgramArray.length - 1].push(allTvPrograms[i]);
      }
    }
    return biDimensionalProgramArray;
  }, [allTvPrograms]);

  //read the enter program and close the sidebar
  const keyEventHandler = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;

      if (key) {
        if (key === KeyEventEnum.Enter) {
          setSelectedProgramState(tvProgram);
          callback();
        }
      }
    },
    [callback, setSelectedProgramState, tvProgram],
  );

  /**
   * break list in array of 10 items to display
   */
  useEffect(() => {
    let biDimensionalProgramArray = getBiDimensionalTvPrograms();

    setProgramList(biDimensionalProgramArray);
  }, [allTvPrograms, getBiDimensionalTvPrograms]);

  /**
   * pass list to hook
   */
  useEffect(() => {
    if (programList.length > 0) {
      setTvPrograms(allTvPrograms);
    }
  }, [allTvPrograms, programList.length, setTvPrograms]);

  /**
   * Determine what section of channel to display
   */
  useEffect(() => {
    let biDimensionalProgramArray = getBiDimensionalTvPrograms();
    for (const tvProgramArrayKey in biDimensionalProgramArray) {
      const hasTheTvProgramInThisArray = biDimensionalProgramArray[tvProgramArrayKey].some((element) => element === tvProgram.programName);
      if (hasTheTvProgramInThisArray) {
        // console.log(tvProgramArrayKey);
        setTvProgramSectionToDisplay(biDimensionalProgramArray[tvProgramArrayKey]);
      }
    }
    // setTvProgramSectionToDisplay(biDimensionalProgramArray[0]);
  }, [getBiDimensionalTvPrograms, tvProgram.programName]);

  /**
   * ON enter set state based on cursor sidebar hook
   */
  useEffect(() => {
    window.addEventListener('keydown', keyEventHandler);
    return () => {
      window.removeEventListener('keydown', keyEventHandler);
    };
  }, [keyEventHandler]);

  const handleChangeProgram = (program: string, count: number) => {
    // console.log(tvProgram);
    setSelectedProgramState({ programName: program, count: count });
    callback();
  };

  return (
    <div className='tv-programs-sidebar'>
      <h1 className='tv-programs-sidebar__header'>Alege program</h1>
      <ul className='tv-programs-sidebar__list'>
        {tvProgramSectionToDisplay.map((program, index) => {
          return (
            <li
              className={classNames([
                { 'tv-programs-sidebar__list__item': tvProgram.programName !== program },
                {
                  'tv-programs-sidebar__list__item-selected': tvProgram.programName === program,
                },
                {
                  'tv-programs-sidebar__list__item-current': selectedTvProgramState && selectedTvProgramState.programName === program,
                },
              ])}
              key={index}
            >
              <button type='button' onClick={() => handleChangeProgram(program, index)}>
                {Object.keys(allTvPrograms).find((key: any) => allTvPrograms[key] === program)}. {program}{' '}
                {selectedTvProgramState && selectedTvProgramState.programName === program && <PlayingLoader />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

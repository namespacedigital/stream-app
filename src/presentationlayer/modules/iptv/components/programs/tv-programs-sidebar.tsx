import './tv-programs-sidebar.scss';
import { useChangeTvProgramHook } from '../hook/change-tv-program.hook';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAtom } from '../../../../../infrastructure/state/jotai';
import { selectedTvProgram } from '../../../../../infrastructure/state/iptv';

interface TvProgramsProps {
  readonly allTvPrograms: string[];
  readonly callback: CallableFunction;
}

export function TvProgramsSidebar({ allTvPrograms, callback }: TvProgramsProps) {
  const [selectedTvProgramState, setSelectedProgramState] = useAtom(selectedTvProgram);
  const [programList, setProgramList] = useState<string[][]>([]);

  const [tvProgram, setTvPrograms, currentDisplayedList] = useChangeTvProgramHook();
  /**
   * break list in array of 10 items to display
   */
  useEffect(() => {
    let biDimensionalProgramArray = [];

    for (let i = 0; i < allTvPrograms.length; i++) {
      if (i % 10 === 0) {
        biDimensionalProgramArray.push([allTvPrograms[i]]);
      } else {
        biDimensionalProgramArray[biDimensionalProgramArray.length - 1].push(allTvPrograms[i]);
      }
    }

    setProgramList(biDimensionalProgramArray);
  }, [allTvPrograms]);

  /**
   * handle the fetching of list
   */
  useEffect(() => {
    if (programList.length > 0) {
      setTvPrograms(programList[0]);
    }
  }, [programList, setTvPrograms]);

  const handleChangeProgram = (program: string, count: number) => {
    // console.log(tvProgram);
    setSelectedProgramState({ programName: program, count: count });
    callback();
  };

  return (
    <div className='tv-programs-sidebar'>
      <h1 className='tv-programs-sidebar__header'>Alege program</h1>
      <ul className='tv-programs-sidebar__list'>
        {currentDisplayedList.map((program, index) => {
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
                {program}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

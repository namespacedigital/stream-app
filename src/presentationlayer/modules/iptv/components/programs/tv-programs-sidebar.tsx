import './tv-programs-sidebar.scss';
import { Sidebar } from '../../../../components/generic/sidebar/sidebar';

interface TvProgramsProps {
  readonly tvPrograms: string[];
}

export function TvProgramsSidebar({ tvPrograms }: TvProgramsProps) {
  return (
    <div className='tv-programs-sidebar'>
      <ul className='tv-programs-sidebar__list'>
        {tvPrograms.map((program, index) => {
          return <li key={index}>{program}</li>;
        })}
      </ul>
    </div>
  );
}

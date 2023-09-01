import { useSetAtom } from '../../../../infrastructure/state/jotai';
import { ModuleEnum, moduleComponent } from '../../../../infrastructure/state/module';
import './nav.scss';
import { FilmIcon, TvIcon } from '../../generic/icons/icons';

export default function Nav() {
  const setModuleComponent = useSetAtom(moduleComponent);
  return (
    <nav role='navigation' className='nav'>
      <button type='button' className='nav__item' onClick={() => setModuleComponent(ModuleEnum.IPTV)} title='TV'>
        <TvIcon className='nav__item__icon' />
        <span>TV</span>
      </button>

      <button type='button' className='nav__item' onClick={() => setModuleComponent(ModuleEnum.MOVIE)} title='Filme'>
        <FilmIcon className='nav__item__icon' />
        <span>Filme</span>
      </button>
    </nav>
  );
}

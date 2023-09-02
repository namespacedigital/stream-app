import { useAtom } from '../../../../infrastructure/state/jotai';
import { ModuleEnum, moduleComponent } from '../../../../infrastructure/state/module';
import './nav.scss';
import { FilmIcon, TvIcon } from '../../generic/icons/icons';
import classNames from 'classnames';

export default function Nav() {
  const [moduleComponentState, setModuleComponentState] = useAtom(moduleComponent);
  return (
    <nav role='navigation' className='nav'>
      <button
        type='button'
        className={classNames(['nav__item', { nav__item__active: moduleComponentState === ModuleEnum.IPTV }])}
        onClick={() => setModuleComponentState(ModuleEnum.IPTV)}
        title='TV'
      >
        <TvIcon className='nav__item__icon' />
        <span>TV</span>
      </button>

      <button
        type='button'
        className={classNames(['nav__item', { nav__item__active: moduleComponentState === ModuleEnum.MOVIE }])}
        onClick={() => setModuleComponentState(ModuleEnum.MOVIE)}
        title='Filme'
      >
        <FilmIcon className='nav__item__icon' />
        <span>Filme</span>
      </button>
    </nav>
  );
}

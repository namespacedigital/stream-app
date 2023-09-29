import { useAtom, useSetAtom } from '../../../../infrastructure/state/jotai';
import { moduleComponent, ModuleEnum } from '../../../../infrastructure/state/module';
import './nav.scss';
import { FilmIcon, TvIcon } from '../../generic/icons/icons';
import classNames from 'classnames';
import { isMovieOpened, isMoviePaused } from '../../../../infrastructure/state/movie';

export default function Nav() {
  const [moduleComponentState, setModuleComponentState] = useAtom(moduleComponent);
  const setIsMoviePaused = useSetAtom(isMoviePaused);
  const setIsMovieOpened = useSetAtom(isMovieOpened);

  const handleModule = (module: ModuleEnum) => {
    //clean
    setIsMoviePaused(false);
    setIsMovieOpened(false);

    //get module
    setModuleComponentState(module);
  };

  return (
    <nav role='navigation' className='nav'>
      <button
        type='button'
        className={classNames(['nav__item', { nav__item__active: moduleComponentState === ModuleEnum.IPTV }])}
        onClick={() => handleModule(ModuleEnum.IPTV)}
        title='TV'
      >
        <TvIcon className='nav__item__icon' />
        <span>TV</span>
      </button>

      <button
        type='button'
        className={classNames(['nav__item', { nav__item__active: moduleComponentState === ModuleEnum.MOVIE }])}
        onClick={() => handleModule(ModuleEnum.MOVIE)}
        title='Filme'
      >
        <FilmIcon className='nav__item__icon' />
        <span>Filme</span>
      </button>
    </nav>
  );
}

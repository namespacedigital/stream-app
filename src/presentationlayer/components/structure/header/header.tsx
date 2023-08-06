import Logo from '../../generic/logo/logo';
import Actions from '../../specific/actions/actions';
import Nav from '../../specific/nav/nav';
import classNames from 'classnames';
import { useAtomValue } from '../../../../infrastructure/state/jotai';
import { isMenuOpen } from '../../../../infrastructure/menu';
import './header.scss';

export default function Header() {
  const isMenuOpenState = useAtomValue(isMenuOpen);

  return (
    <header className='header'>
      <div className={classNames(['header__dropdown', { 'header__dropdown--active': isMenuOpenState }])}>
        <div className='header__dropdown__content'>
          <div className='header__dropdown__content__nav'>
            <Logo />
            <Nav />
          </div>
          <div className='header__dropdown__content__actions'>
            <Actions />
          </div>
        </div>
      </div>
    </header>
  );
}

import { CogIcon } from '../../generic/icons/icons';
import './actions.scss';

export default function Actions() {
  return (
    <nav role='navigation' className='actions'>
      <button type='button' className='actions__item' title='Settings'>
        <CogIcon className='actions__item__icon' />
      </button>
    </nav>
  );
}

import { CogIcon } from '../../generic/icons/icons';
import './actions.scss';
import { moduleComponent, ModuleEnum } from '../../../../infrastructure/state/module';
import { useAtom } from '../../../../infrastructure/state/jotai';
import classNames from 'classnames';

export default function Actions() {
  const [moduleComponentState, setModuleComponentState] = useAtom(moduleComponent);
  const handleModule = (module: ModuleEnum) => {
    //get module
    setModuleComponentState(module);
  };
  return (
    <nav role='navigation' className='actions'>
      <button
        onClick={() => handleModule(ModuleEnum.CONFIGURATION)}
        type='button'
        className={classNames(['actions__item', { nav__item__active: moduleComponentState === ModuleEnum.CONFIGURATION }])}
        title='Settings'
      >
        <CogIcon className='actions__item__icon' />
      </button>
    </nav>
  );
}

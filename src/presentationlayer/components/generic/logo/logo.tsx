import { LogoIcon } from '../icons/icons';

export default function Logo() {
  return (
    <div className='block p-[0.88rem]'>
      <LogoIcon className='w-16 h-8 dark:[&>g>path]:fill-white' />
    </div>
  );
}

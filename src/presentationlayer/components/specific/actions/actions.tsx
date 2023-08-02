import { CogIcon } from '../../generic/icons/icons';

export default function Actions() {
  return (
    <nav role='navigation' className='flex text-primary-300'>
      <button
        type='button'
        title='Settings'
        className='group transition duration-300 flex justify-center items-center w-[3.8rem] hover:bg-default-green rounded-br-3xl'
      >
        <CogIcon className='w-8 fill-primary-300 group-hover:fill-white' />
      </button>
    </nav>
  );
}

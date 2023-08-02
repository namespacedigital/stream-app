
import { useSetAtom } from '../../../../infrastructure/state/jotai';
import { ModuleEnum, moduleComponent } from '../../../../infrastructure/module';

export default function Nav() {
  const setModuleComponent = useSetAtom(moduleComponent)
  return (
    <nav role='navigation' className='h-full flex text-2xl'>
  
      <button
        type='button'
        onClick={()=>setModuleComponent(ModuleEnum.IPTV)}
        title='TV'
        className='group transition duration-300 flex justify-center items-center w-[3.8rem] hover:bg-default-green hover:text-white px-16 font-extrabold'
      >
       <span className='text-white'>TV</span> 
      </button>

      <button
        type='button'
        onClick={()=>setModuleComponent(ModuleEnum.MOVIE)}
        title='Filme'
        className='group transition duration-300 flex justify-center items-center w-[3.8rem] hover:bg-default-green hover:text-white px-16 font-extrabold'
      >
        Filme 
      </button>

    </nav>
  );
}

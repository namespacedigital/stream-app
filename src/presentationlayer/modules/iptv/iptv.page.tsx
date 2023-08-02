import { isMenuOpen } from '../../../infrastructure/menu';
import { useAtom } from '../../../infrastructure/state/jotai';

export default function IptvPage() {
  const [isMenuOpenState, setIsMenuOpenState] = useAtom(isMenuOpen);

  const handleMenu = () => {
     setIsMenuOpenState(!isMenuOpenState);
  };
  return (
    <div className='w-screen h-screen flex justify-center items-center text-white'>
      <button className='w-full h-full ' type='button' onClick={handleMenu}>
        TV 
      </button>
    </div>
  );
}

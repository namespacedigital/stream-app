import { isMenuOpen } from '../../../infrastructure/menu';
import { useAtom } from '../../../infrastructure/state/jotai';
import './iptv.scss'

export default function IptvPage() {
  const [isMenuOpenState, setIsMenuOpenState] = useAtom(isMenuOpen);

  const handleMenu = () => {
     setIsMenuOpenState(!isMenuOpenState);
  };
  return (
    <div className='iptv'>
      <button className='iptv__content' type='button' onClick={handleMenu}>
        TV 
      </button>
    </div>
  );
}

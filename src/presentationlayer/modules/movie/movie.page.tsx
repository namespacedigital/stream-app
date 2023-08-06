import { isMenuOpen } from '../../../infrastructure/menu';
import { useAtom } from '../../../infrastructure/state/jotai';
import './movie.scss'

export default function MoviePage() {
  const [isMenuOpenState, setIsMenuOpenState] = useAtom(isMenuOpen);

  const handleMenu = () => {
    setIsMenuOpenState(!isMenuOpenState);
  };
  return (
    <div className='movie'>
      <button className='movie__content' type='button' onClick={handleMenu}>
        Filme
      </button>
    </div>
  );
}
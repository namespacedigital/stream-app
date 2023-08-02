import { LoaderIcon } from '../icons/icons';

export default function SvgInlineLoader() {
  return (
    <span>
      <LoaderIcon className='motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white [&>circle]:opacity-50 ' />
    </span>
  );
}

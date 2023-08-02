import { useEffect, useState } from 'react';

export interface IBoundary {
  error?: Error;
}

export default function Boundary({ error }: IBoundary) {
  const [currentError, setCurrentError] = useState('');

  useEffect(() => {
    if (!error || !error.message) {
      setCurrentError('Unknown Error');
    }

    if (error && error.message) {
      setCurrentError(error.message);
    }
  }, [error]);

  return (
    <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>Ooops! Something went terribly wrong :(</h1>
        <p className='mt-6 text-base leading-7 text-gray-600'>
          Try to refresh the app or if the error persists, please contact an administrator.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <button
            type='button'
            className='rounded-md bg-default-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            onClick={() => window.location.reload()}
          >
            Go back home
          </button>
          <button className='text-sm font-semibold text-gray-900'>
            Contact support <span aria-hidden='true'>&rarr;</span>
          </button>
        </div>
        <p className='text-base font-semibold text-gray-400'>[{currentError}]</p>
      </div>
    </main>
  );
}

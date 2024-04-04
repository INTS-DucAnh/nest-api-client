import { useEffect, useState } from 'react';

export default function FetchingData() {
  const [dot, SetDot] = useState<number>(0);

  useEffect(() => {
    const loadDots = setTimeout(() => {
      SetDot((dot + 1)%4);
    }, 500);  
    return () => {
      clearTimeout(loadDots);
    }
  }, [dot]);
  return (
    <div className='absolute w-full h-full top-0 left-0 bg-transparent bg-opacity-5 backdrop-blur-sm grid place-items-center z-10' >
      <p className='p-5'>Recieving data {'.'.repeat(dot)}</p>
    </div>

  )

}
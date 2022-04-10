import { useLayoutEffect, useRef } from 'react';
import Navbar from '../parts/Navbar';
import Carousel from '../parts/Home/Carousel';

export default function Home() {
  const navbarRef = useRef();
  const bodyContainerRef = useRef();

  useLayoutEffect(() => {
    if (navbarRef?.current) {
      bodyContainerRef.current.style.paddingTop = `${navbarRef.current.clientHeight}px`;
    }
  }, []);;

  return (
    <>
      <Navbar ref={navbarRef} />
      <div ref={bodyContainerRef} className="px-10 space-y-8">
        <Carousel />
      </div>
    </>
  )
}
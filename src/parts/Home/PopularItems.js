import { useCallback, useLayoutEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function PopularItems() {
  const carouselHandlerRef = useRef();
  const chevronRef = useRef();
  const itemPosition = useRef(0);

  useLayoutEffect(() => {
    const totalItemPerCarousel = window.clientWidth < 767 ? 1 : 6;
    const cardSize = Math.floor(carouselHandlerRef.current.clientWidth / totalItemPerCarousel);

    if (carouselHandlerRef.current.childNodes.length < totalItemPerCarousel) {
      chevronRef.current.childNodes[0].style.visibility = 'hidden';
      chevronRef.current.childNodes[1].style.visibility = 'hidden';
    } else {
      chevronRef.current.childNodes[0].style.visibility = 'hidden';
    }
    carouselHandlerRef.current.childNodes.forEach(node => {
      node.style.width = `${cardSize}px`;
    });
  }, [carouselHandlerRef]);

  const goPrev = useCallback(() => {
    const totalItemPerCarousel = window.clientWidth < 767 ? 1 : 6;
    const cardSize = carouselHandlerRef.current.childNodes[0].clientWidth;
    const cardLength = carouselHandlerRef.current.childNodes.length;
    if (itemPosition.current === cardLength - (totalItemPerCarousel - 1)) {
      chevronRef.current.childNodes[1].style.visibility = 'visible';
    }
    itemPosition.current--;
    if (itemPosition.current === 0) {
      chevronRef.current.childNodes[0].style.visibility = 'hidden';
    }
    carouselHandlerRef.current.style.transform = `translateX(-${cardSize * itemPosition.current + (16 * itemPosition.current)}px`;
  }, [carouselHandlerRef, itemPosition]);

  const goNext = useCallback(() => {
    const totalItemPerCarousel = window.clientWidth < 767 ? 1 : 6;
    const cardSize = carouselHandlerRef.current.childNodes[0].clientWidth;
    const cardLength = carouselHandlerRef.current.childNodes.length;
    if (itemPosition.current === 0) {
      chevronRef.current.childNodes[0].style.visibility = 'visible';
    }
    itemPosition.current++;
    if (itemPosition.current === cardLength - (totalItemPerCarousel - 1)) {
      chevronRef.current.childNodes[1].style.visibility = 'hidden';
    }
    carouselHandlerRef.current.style.transform = `translateX(-${cardSize * itemPosition.current + (16 * itemPosition.current)}px`;
  }, [carouselHandlerRef, itemPosition]);

  return (
    <div className="mt-8 overflow-hidden relative group rounded-sm">
      <div className="text-lg uppercase font-medium mb-3">New Arrival</div>
      <ul ref={carouselHandlerRef} className="flex transition-all duration-700">
        <li className="bg-sky-400 rounded-sm shrink-0 overflow-hidden cursor-pointer">
          <img src="/images/content/item1.jpg" alt="1" className="w-full aspect-square" />
        </li>
        <li className="bg-sky-400 rounded-sm shrink-0 overflow-hidden ml-4 cursor-pointer">
          <img src="/images/content/item2.jpg" alt="2" className="w-full aspect-square" />
        </li>
        <li className="bg-sky-400 rounded-sm shrink-0 overflow-hidden ml-4 cursor-pointer">
          <img src="/images/content/item3.jpg" alt="3" className="w-full aspect-square" />
        </li>
        <li className="bg-sky-400 rounded-sm shrink-0 overflow-hidden ml-4 cursor-pointer">
          <img src="/images/content/item4.jpg" alt="4" className="w-full aspect-square" />
        </li>
        <li className="bg-sky-400 rounded-sm shrink-0 overflow-hidden ml-4 cursor-pointer">
          <img src="/images/content/item4.jpg" alt="4" className="w-full aspect-square" />
        </li>
        <li className="bg-sky-400 rounded-sm shrink-0 overflow-hidden ml-4 cursor-pointer">
          <img src="/images/content/item4.jpg" alt="4" className="w-full aspect-square" />
        </li>
        <li className="bg-sky-400 rounded-sm shrink-0 overflow-hidden ml-4 cursor-pointer">
          <img src="/images/content/item4.jpg" alt="4" className="w-full aspect-square" />
        </li>
        <li className="bg-sky-400 rounded-sm shrink-0 overflow-hidden ml-4 cursor-pointer">
          <img src="/images/content/item4.jpg" alt="4" className="w-full aspect-square" />
        </li>
      </ul>
      <div ref={chevronRef} className="absolute top-1/2 -translate-y-1/2 flex w-full justify-between px-8">
        <button className="p-4 bg-white flex justify-center items-center rounded-full" onClick={goPrev}>
          <FiChevronLeft />
        </button>
        <button className="p-4 bg-white flex justify-center items-center rounded-full" onClick={goNext}>
          <FiChevronRight />
        </button>
      </div>
    </div>
  )
}
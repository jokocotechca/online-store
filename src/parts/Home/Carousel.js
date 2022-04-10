import { useCallback, useLayoutEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// function ItemSample({ bgColor }) {
//   return (
//     <div className={`w-full h-72 bg-gray-500 rounded-sm shrink-0`} />
//   )
// }

export default function Carousel() {
  const carouselHandlerRef = useRef();
  const carouselIndicatorRef = useRef();
  const carouselCounter = useRef(0);
  const carouselInterval = useRef(null);
  const carouselIntervalFn = useRef(null);

  useLayoutEffect(() => {
    const itemLength = carouselHandlerRef.current.childNodes.length;

    for (let i = 0; i < itemLength; i++) {
      const indicatorElement = document.createElement('div');
      indicatorElement.classList.add(...'rounded-full w-2 h-2'.split(' '), ...(i === 0 ? 'bg-black border border-white'.split(' ') : ['bg-white']));
      carouselIndicatorRef.current.append(indicatorElement);
    }

    carouselIntervalFn.current = () => {
      const itemLength = carouselHandlerRef.current.childNodes.length;
      const itemWidth = carouselHandlerRef.current.childNodes[0].clientWidth;

      if (carouselCounter.current >= itemLength - 1) {
        carouselCounter.current = 0;
      } else {
        carouselCounter.current++;
      }

      carouselHandlerRef.current.style.transform = `translateX(-${itemWidth * carouselCounter.current}px)`;
      carouselIndicatorRef.current.childNodes.forEach((node, i) => {
        if (i === carouselCounter.current) {
          node.classList.remove('bg-white');
          node.classList.add(...'bg-black border border-white'.split(' '));
        } else {
          node.classList.remove(...'bg-black border border-white'.split(' '));
          node.classList.add('bg-white');
        }
      });
    }

    carouselInterval.current = setInterval(carouselIntervalFn.current, 3000);

    return () => {
      clearInterval(carouselInterval.current);
    }
  }, [carouselHandlerRef, carouselCounter, carouselInterval, carouselIndicatorRef, carouselIntervalFn]);

  const goNext = useCallback(() => {
    clearInterval(carouselInterval.current);

    carouselIntervalFn.current();

    carouselInterval.current = setInterval(carouselIntervalFn.current, 3000);
  }, [carouselInterval, carouselIntervalFn]);

  const goPrev = useCallback(() => {
    clearInterval(carouselInterval.current);

    const itemLength = carouselHandlerRef.current.childNodes.length;
    const itemWidth = carouselHandlerRef.current.childNodes[0].clientWidth;

    if (carouselCounter.current > 0) {
      carouselCounter.current--;
    } else {
      carouselCounter.current = itemLength - 1;
    }

    carouselHandlerRef.current.style.transform = `translateX(-${itemWidth * carouselCounter.current}px)`;
    carouselIndicatorRef.current.childNodes.forEach((node, i) => {
      if (i === carouselCounter.current) {
        node.classList.remove('bg-white');
        node.classList.add(...'bg-black border border-white'.split(' '));
      } else {
        node.classList.remove(...'bg-black border border-white'.split(' '));
        node.classList.add('bg-white');
      }
    });

    carouselInterval.current = setInterval(carouselIntervalFn.current, 3000);
  }, [carouselHandlerRef, carouselCounter, carouselInterval, carouselIntervalFn]);

  return (
    <div className="mt-8 overflow-hidden relative group ">
      <ul ref={carouselHandlerRef} className="flex transition-transform duration-700">
        <li className="w-full h-72 rounded-sm shrink-0 overflow-hidden">
          <img src="/images/content/1.jpg" alt="1" />
        </li>
        <li className="w-full h-72 rounded-sm shrink-0 overflow-hidden">
          <img src="/images/content/2.jpg" alt="2" />
        </li>
        <li className="w-full h-72 rounded-sm shrink-0 overflow-hidden">
          <img src="/images/content/3.jpg" alt="3" />
        </li>
      </ul>
      <div ref={carouselIndicatorRef} className="absolute top-4 left-4 flex space-x-1" />
      <div className="absolute top-1/2 -translate-y-1/2 flex w-full justify-between px-2 opacity-0 group-hover:px-8 group-hover:opacity-100 transition-all duration-500">
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
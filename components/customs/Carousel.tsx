import React, { useState } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
const MAX_VISIBILITY = 3;
import { CarouselProps } from "@/types/propsTypes";

const Carousel: React.FC<CarouselProps> = ({
  children,
  arrowTopPosition,
  carouselWidth,
  carouselHeight,
}) => {
  const [active, setActive] = useState(0);
  const count = React.Children.count(children);

  return (
    <div
      className="carousel"
      style={{
        width: `${carouselWidth}px`,
        height: `${carouselHeight}px`,
      }}
    >
      {active > 0 && (
        <button
          className="nav left"
          style={{
            top: arrowTopPosition,
          }}
          onClick={() => setActive((i) => i - 1)}
        >
          <TiChevronLeftOutline className="arrow" />
        </button>
      )}
      {React.Children.map(children, (child, i) => (
        <div
          className="card-container"
          style={{
            //@ts-ignore
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            "pointer-events": active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button
          className="nav right"
          style={{
            top: arrowTopPosition,
          }}
          onClick={() => setActive((i) => i + 1)}
        >
          <TiChevronRightOutline className="arrow" />
        </button>
      )}
    </div>
  );
};

export default Carousel;

import React from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver.hook.js";
import "./collection-item-fallback.styles.scss";

const CollectionItemFallback = (props) => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);
  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        setIsVisible(true);
        observerElement.unobserve(ref.current);
      }
    },
  });
  const aspectRatio = (props.height / props.width) * 100;
  return (
    <div
      ref={ref}
      className="image-container"
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      {isVisible && <img className="image" src={props.src} alt={props.alt} />}
    </div>
  );
};

export default CollectionItemFallback;

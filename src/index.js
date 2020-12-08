import './index.scss';
import * as React from 'react';
import { useState, useLayoutEffect, useEffect, useRef } from 'react';

const GUTTER_WIDTH = 40;
const OBSERVED_ATTRIBUTES = ['scrollTop', 'scrollHeight', 'offsetTop'];

export function ScrollY({ dark, children }) {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  // We store a reference to the top level node to set data attributes
  // We use these data attributes to style the scrollbar
  // - scrolling: the element is scrolling (with a 100ms timeout using scrollingTimeout)
  // - hidden: the element has no scrollbar
  // - moving: the element is being dragged
  const rootRef = useRef(null);
  const scrollingTimeout = useRef(null);

  // This stores a reference to the inner div that we measure
  const scrollContainerRef = useRef(null);

  // This stores a reference to the scrollbar itself
  const scrollbarRef = useRef(null);

  // Are we currently dragging the scrollbar
  const isDraggingScrollbar = useRef(false);

  // Initial scrollTop when we started dragging
  const initialScrollTop = useRef(0);

  // Initial scrollbar position
  const initialScrollbarY = useRef(0);
  let scrollbarScale = useRef(1);

  useEffect(() => {
    let animationId = null;

    // Previously measured values of OBSERVED_ATTRIBUTES
    let prevValues = {};

    // measure every frame
    // This is the only reliable way to check for scrollHeight changes
    const animationLoop = () => {
      const rootNode = rootRef.current;
      const scrollContainer = scrollContainerRef.current;
      const scrollbar = scrollbarRef.current;

      if (scrollContainer != null) {
        const newValues = {};

        // Measure from DOM
        newValues.scrollTop = scrollContainer.scrollTop;
        newValues.scrollHeight = scrollContainer.scrollHeight;
        newValues.offsetHeight = scrollContainer.offsetHeight;

        // Check if any value has changed
        if (OBSERVED_ATTRIBUTES.some((key) => newValues[key] !== prevValues[key])) {
          if (scrollingTimeout.current != null) {
            clearTimeout(scrollingTimeout.current);
          }
          if (rootNode != null) {
            rootNode.dataset.scrolling = true;
          }
          scrollingTimeout.current = setTimeout(() => {
            const rootNode = rootRef.current;
            if (rootNode != null) {
              delete rootNode.dataset.scrolling;
            }
          }, 100);
          prevValues = newValues;
        }

        const { scrollTop, scrollHeight, offsetHeight } = newValues;

        const offset = (100 * scrollTop) / scrollHeight;
        const scale = offsetHeight / scrollHeight;
        scrollbarScale.current = scale;

        // Draw the new scrollbar
        if (scrollbar != null) {
          scrollbar.style.transform = `translateY(${offset}%) scaleY(${scale})`;
          Array.from(scrollbar.children).forEach((e) => (e.style.transform = `scaleY(${1 / scale})`));
        }

        // Show or hide the scrollbar depending on scale
        if (rootNode != null) {
          if (scale < 1) {
            delete rootNode.dataset.hidden;
          } else {
            rootNode.dataset.hidden = true;
          }
        }
      }
      requestAnimationFrame(animationLoop);
    };

    const mouseDown = (event) => {
      // Prevent click events from bubbling up and closing modals for instance
      event.preventDefault();
      const scroller = scrollContainerRef.current;
      if (scroller != null) {
        isDraggingScrollbar.current = true;
        initialScrollbarY.current = event.clientY;
        initialScrollTop.current = scroller.scrollTop;
      }
      const rootNode = rootRef.current;
      if (rootNode != null) {
        rootNode.dataset.moving = true;
      }
    };

    const mouseUp = () => {
      if (!isDraggingScrollbar.current) {
        return;
      }
      isDraggingScrollbar.current = false;
      const rootNode = rootRef.current;
      if (rootNode != null) {
        delete rootNode.dataset.moving;
      }
    };

    const mouseMove = (event) => {
      if (!isDraggingScrollbar.current) {
        return;
      }
      const scroller = scrollContainerRef.current;
      if (scroller != null) {
        const diff = (event.clientY - initialScrollbarY.current) / scrollbarScale.current;
        scroller.scrollTop = initialScrollTop.current + diff;
      }
    };

    const scrollbar = scrollbarRef.current;
    animationLoop();
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mousemove', mouseMove);
    scrollbar.addEventListener('mousedown', mouseDown);
    return () => {
      // Cancel the animationLoop
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mousemove', mouseMove);
      scrollbar.removeEventListener('mousedown', mouseDown);
    };
  }, []);

  useLayoutEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer != null) {
      const width = scrollContainer.offsetWidth - scrollContainer.clientWidth;
      setScrollbarWidth((_w) => width);
    }
  }, []);

  return (
    <div className={`scroll-y ${dark ? 'dark' : ''}`} ref={rootRef}>
      <div
        ref={scrollContainerRef}
        className="scroll-y__scrollbar-hider"
        style={{
          // Hide scrollbar outside of viewport
          right: -GUTTER_WIDTH,
          paddingRight: GUTTER_WIDTH - scrollbarWidth,
        }}
      >
        {children}
      </div>
      <div className="scroll-y__scrollbar-container">
        <div ref={scrollbarRef} className="scroll-y__scrollbar">
          <div className="scroll-y__scrollbar__top" />
          <div className="scroll-y__scrollbar__bottom" />
        </div>
      </div>
    </div>
  );
}

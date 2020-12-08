import './index.scss';
import * as React from 'react';
import type { ReactNode } from 'react';
import { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { observe } from './rafobserver';

const GUTTER_WIDTH = 40;

export function ScrollY({ dark, children }: { dark?: boolean; children: ReactNode }) {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  // We store a reference to the top level node to set data attributes
  // We use these data attributes to style the scrollbar
  // - scrolling: the element is scrolling (with a 100ms timeout using scrollingTimeout)
  // - hidden: the element has no scrollbar
  // - moving: the element is being dragged
  const rootRef = useRef<HTMLDivElement>(null);

  // This stores a reference to the inner div that we measure
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // This stores a reference to the scrollbar itself
  const scrollbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const state = {
      // Are we currently dragging the scrollbar
      _isDraggingScrollbar: false,
      // Initial scrollTop when we started dragging
      _initialScrollTop: -1,
      // Initial scrollbar position
      _initialScrollbarY: -1,
      _scrollbarScale: 1,
      _offset: -1,
      _timeout: null,
    };
    // Previously measured values
    let prevValues = [];

    const { dataset } = rootRef.current;
    const scrollContainer = scrollContainerRef.current;
    const scrollbar = scrollbarRef.current;

    // measure every frame
    // This is the only reliable way to check for scrollHeight changes
    const unobserve = observe(
      () => {
        // console.log('measure called');
        return [scrollContainer.scrollTop, scrollContainer.scrollHeight, scrollContainer.offsetHeight];
      },
      (newValues, time) => {
        // Check if any value has changed
        if (newValues.some((val, i) => val !== prevValues[i])) {
          clearTimeout(state._timeout);
          state._timeout = setTimeout(() => {
            delete dataset.scrolling;
          }, 100);
          dataset.scrolling = 'true';
          prevValues = newValues;
        }
        const [scrollTop, scrollHeight, offsetHeight] = newValues;

        const offset = (100 * scrollTop) / scrollHeight;
        const scale = offsetHeight / scrollHeight;

        if (state._scrollbarScale !== scale || offset != state._offset) {
          // Move the scrollbar
          scrollbar.style.transform = `translateY(${offset}%) scaleY(${scale})`;
          if (scale != state._scrollbarScale) {
            // If scale has changed, we need to redraw the rounded corners of the bar
            for (const child of Array.from(scrollbar.children)) {
              (child as HTMLElement).style.transform = `scaleY(${1 / scale})`;
            }
            // Show or hide the scrollbar depending on scale
            if (scale < 1) {
              delete dataset.hidden;
            } else {
              dataset.hidden = 'true';
            }
            state._scrollbarScale = scale;
          }
        }
      },
    );

    const mouseDown = (event: MouseEvent) => {
      // Prevent click events from bubbling up and closing modals for instance
      event.preventDefault();
      state._isDraggingScrollbar = true;
      state._initialScrollbarY = event.clientY;
      state._initialScrollTop = scrollContainer.scrollTop;

      dataset.moving = 'true';
    };

    const mouseUp = () => {
      if (!state._isDraggingScrollbar) {
        return;
      }
      state._isDraggingScrollbar = false;
      delete dataset.moving;
    };

    const mouseMove = (event: MouseEvent) => {
      if (!state._isDraggingScrollbar) {
        return;
      }
      const diff = (event.clientY - state._initialScrollbarY) / state._scrollbarScale;
      scrollContainer.scrollTop = state._initialScrollTop + diff;
    };

    addEventListener('mouseup', mouseUp);
    addEventListener('mousemove', mouseMove);
    scrollbar.addEventListener('mousedown', mouseDown);
    return () => {
      // Cancel the animationLoop
      unobserve();
      removeEventListener('mouseup', mouseUp);
      removeEventListener('mousemove', mouseMove);
      scrollbar.removeEventListener('mousedown', mouseDown);
    };
  }, []);

  useLayoutEffect(() => {
    const { offsetWidth, clientWidth } = scrollContainerRef.current;

    const width = offsetWidth - clientWidth;
    setScrollbarWidth(width);
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
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}

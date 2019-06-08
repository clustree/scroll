import '@clustree/scroll/lib/index.css';
import './App.css';

import React, { useState, useLayoutEffect } from 'react';
import { ScrollY } from '@clustree/scroll';
import { Number } from 'core-js';

function useDarkMode(defaultValue = false) {
  const [isDark, toggleDark] = useState(defaultValue);

  useLayoutEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return [isDark, () => toggleDark(v => !v)];
}

const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

function LoremIpsum({ count }) {
  return (
    <>
      {new Array(count).fill(LOREM).map((l, i) => (
        <p key={i}>{l}</p>
      ))}
    </>
  );
}

function NativeScroll({ children }) {
  return <div className="nativeScroll">{children}</div>;
}

function App() {
  const [isDark, toggleDark] = useDarkMode(true);
  const [useNativeScroll, toggleNativeScroll] = useState(true);
  const [dropdownOpen, toggleDropDown] = useState(false);
  const [count, setCount] = useState(5);

  const Component = useNativeScroll ? NativeScroll : ScrollY;
  return (
    <div className="App">
      <h1>@clustree/scroll</h1>

      <div className="main">
        <div>
          <p>
            <code>{'<ScrollY />'}</code> is a custom scrollbar with a transparent track.
          </p>
          <p>
            It takes one boolean prop: <code>dark</code> that determines if the scrollbar thumb is dark or light.
          </p>
          <p>
            This allows one to have consistent scrollbar styling across many browsers and OSes, including Internet
            Explorer 11.
          </p>
          <button type="button" onClick={toggleDark}>
            Toggle Dark mode
          </button>
        </div>
        <div>
          <h3>Demo:</h3>
          <h4>
            {useNativeScroll ? 'Using native scrollbars' : 'Using <ScrollY />'}{' '}
            <button type="button" onClick={() => toggleNativeScroll(v => !v)}>
              {!useNativeScroll ? 'Use native scrollbars' : 'Use <ScrollY />'}{' '}
            </button>
          </h4>

          <label>
            Number of paragraphs:{` `}
            <input
              type="range"
              min="1"
              max="10"
              value={count}
              onChange={e => setCount(Number.parseInt(e.target.value, 10))}
            />
            {` ${count}`}
          </label>

          <div className="demo">
            <Component dark={!isDark}>
              <div className="inner">
                <LoremIpsum count={count} />
                <div className="relative">
                  <button onClick={() => toggleDropDown(v => !v)}>Toggle absolutely positionned content</button>
                  {dropdownOpen ? (
                    <div className="absolute">
                      Absolute content that overflows affects total height for the scrollbar
                    </div>
                  ) : null}
                </div>
              </div>
            </Component>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

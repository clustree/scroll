# @clustree/scroll

## Install

```bash
# Yarn
yarn add @clustree/scroll

# NPM
npm install --save @clustree/scroll
```

## Usage

```js
// Import styles for <ScrollY />
import '@clustree/scroll/lib/index.css';
import { ScrollY } from '@clustree/scroll';

const darkBarkground = (
  <SizedContainer>
    <ScrollY>{contents}</ScrollY>
  </SizedContainer>
);

// or for light colored backgrounds
const lightBackground = (
  <SizedContainer>
    <ScrollY dark>{contents}</ScrollY>
  </SizedContainer>
);
```

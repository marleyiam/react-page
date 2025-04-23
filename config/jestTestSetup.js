import '@testing-library/jest-dom';
import React from 'react';

// Fix React 18+ useLayoutEffect warnings in JSDOM
React.useLayoutEffect = React.useEffect;

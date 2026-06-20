import { useState } from 'react';

export const Counter = (): number => {
  const [count] = useState(0);
  return count;
};

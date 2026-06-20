import { useState } from 'react';

export const Counter = (flag: boolean): number => {
  if (flag) {
    const [count] = useState(0);
    return count;
  }
  return 0;
};

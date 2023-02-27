import React from 'react';

export const useAutoTextSize = (textAreaRef, value) => {
  React.useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = '0px';
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, value]);
};

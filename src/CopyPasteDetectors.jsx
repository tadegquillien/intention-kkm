import { useEffect, useState } from 'react';

export function useCopyEventDetector() {
  const [copyCount, setCopyCount] = useState(0);

  useEffect(() => {
    const handleCopy = () => {
      setCopyCount(prevCount => prevCount + 1);
    };

    // Add event listener
    document.addEventListener('copy', handleCopy);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  return copyCount;
}

export function usePasteEventDetector() {
  const [pasteCount, setPasteCount] = useState(0);

  useEffect(() => {
    const handlePaste = () => {
      setPasteCount(prevCount => prevCount + 1);
    };

    // Add event listener
    document.addEventListener('paste', handlePaste);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  return pasteCount;
}
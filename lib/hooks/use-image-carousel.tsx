import { useCallback, useState } from "react";

export function useImageCarousel(totalImages: number) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setCurrentImage((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    },
    [totalImages],
  );

  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setCurrentImage((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
    },
    [totalImages],
  );

  const goToImage = useCallback((e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImage(index);
  }, []);

  const reset = useCallback(() => {
    setIsHovered(false);
    setCurrentImage(0);
  }, []);

  return {
    isHovered,
    setIsHovered,
    currentImage,
    handleNext,
    handlePrev,
    goToImage,
    reset,
  };
}

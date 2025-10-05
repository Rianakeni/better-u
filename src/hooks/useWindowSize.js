import { useState, useEffect } from "react";

// Hook untuk mendapatkan ukuran window browser
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Panggil sekali saat inisialisasi

    // Cleanup listener saat komponen di-unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;

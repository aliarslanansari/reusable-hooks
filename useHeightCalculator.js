/**
 Usage example
 
 useHeightCalculator(containerRef, ["main-header", "page-main-tabs"], 635, 28);
 
 this Hook will apply height to containerRef element by 
 subtracting "main-header", "page-main-tabs" height, and also substract 28px.
  
 You can also mention minHeight in this case it is 635px.
*/

import { useEffect, useState } from "react";

const useHeightCalculator = (elementRef, otherElementIds, minHeight = 0, offset = 0) => {
    const [height, setHeight] = useState(minHeight);

    useEffect(() => {
        const calculateHeight = () => {
            const windowHeight = window.innerHeight;
            const otherElementHeights = otherElementIds.reduce((totalHeight, id) => {
                const element = document.getElementById(id);
                if (element) {
                    const elementHeight = element.offsetHeight;
                    return totalHeight + elementHeight;
                }
                return totalHeight;
            }, 0);

            const calculatedHeight = windowHeight - otherElementHeights - offset;
            const finalHeight = Math.max(calculatedHeight, minHeight);

            if (elementRef.current) {
                elementRef.current.style.height = `${finalHeight}px`;
            }

            setHeight(finalHeight);
        };

        calculateHeight();

        window.addEventListener("resize", calculateHeight);

        return () => {
            window.removeEventListener("resize", calculateHeight);
        };
    }, [elementRef, otherElementIds, minHeight, offset]);

    return height;
};

export default useHeightCalculator;

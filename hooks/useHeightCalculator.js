import { useEffect, useState } from "react";

/**
 * Custom React hook to dynamically calculate and assign height to an element
 * based on the window height and the heights of other specified elements.
 * @param {object} elementRef - Reference to the target element.
 * @param {string[]} otherElementIds - Array of IDs of other elements whose heights should be subtracted.
 * @param {number} [minHeight=0] - Minimum height for the element.
 * @param {number} [offset=0] - Additional offset to be subtracted from the calculated height.
 * @returns {void} 
 */
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

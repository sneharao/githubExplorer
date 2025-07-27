import { useEffect, RefObject } from 'react';

/**
 * Custom React hook for Intersection Observer.
 * Observes a target element and triggers a callback when it intersects the viewport.
 *
 * @param {RefObject<HTMLElement>} targetRef A ref object pointing to the DOM element to observe.
 * @param {() => void} callback The function to execute when the target element intersects.
 * @param {IntersectionObserverInit} [options] Optional configuration for the Intersection Observer.
 * Defaults to observing the viewport with no margin and a threshold of 0.1.
 */
export function useIntersectionObserver(
    targetRef: RefObject<HTMLElement | null>,
    callback: () => void,
    options: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 0.1 }
) {
    useEffect(() => {
        const targetElement = targetRef.current;

        // If there's no element to observe, just return
        if (!targetElement) {
            console.warn('Intersection Observer target element is null.');
            return;
        }


        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(); // Execute the provided callback when intersecting
                }
            });
        }, options);

        // Start observing the target element
        observer.observe(targetElement);

        // Cleanup function: unobserve and disconnect when the component unmounts
        return () => {
            if (targetElement) {
                observer.unobserve(targetElement);
            }
            observer.disconnect();
        };
    }, [targetRef, callback, options]);
}

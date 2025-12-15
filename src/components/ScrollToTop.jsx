import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        // If no hash, just scroll to top
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }

        // Ignore special stack-detail hashes handled by InfrastructureStack
        if (hash.startsWith('#stack-detail-')) {
            return;
        }

        // Standard ID scrolling with retry for React rendering
        const scrollToElement = () => {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        // Attempt immediately
        scrollToElement();

        // Retry after a short delay to allow for mounting
        const timer = setTimeout(scrollToElement, 100);

        return () => clearTimeout(timer);
    }, [pathname, hash, key]);

    return null;
};

export default ScrollToTop;

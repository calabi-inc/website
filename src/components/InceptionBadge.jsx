import { useState } from 'react';

// The badge file comes from the NVIDIA Inception member portal and is used as supplied: no recolouring,
// no cropping, no added text. Until the founder places it under public/assets/partners/, the image fails
// to load and this renders nothing, so the site shows no membership mark it cannot back.
const SRC = '/assets/partners/nvidia-inception-program.png';

export const InceptionBadge = () => {
    const [available, setAvailable] = useState(true);
    if (!available) return null;
    return (
        <a
            href="https://www.nvidia.com/en-us/startups/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NVIDIA Inception program member"
            className="inline-flex"
        >
            <img
                src={SRC}
                alt="NVIDIA Inception Program member"
                className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                onError={() => setAvailable(false)}
            />
        </a>
    );
};

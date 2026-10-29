import { useState } from 'react';

// The NVIDIA Inception Program badge: the colour screen PNG from the Inception member kit, used as supplied
// (no recolouring, cropping or added text; it carries its own white box, so it reads on the black footer).
// If the file is ever missing the image fails to load and this renders nothing.
const SRC = '/assets/partners/nvidia-inception-program.png';

export const InceptionBadge = () => {
    const [available, setAvailable] = useState(true);
    if (!available) return null;
    return (
        <a
            href="https://www.nvidia.com/en-us/startups/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NVIDIA Inception Program member"
            className="inline-flex"
        >
            <img
                src={SRC}
                alt="NVIDIA Inception Program member"
                width="501"
                height="217"
                className="h-12 w-auto"
                loading="lazy"
                onError={() => setAvailable(false)}
            />
        </a>
    );
};

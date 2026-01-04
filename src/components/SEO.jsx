import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export const SEO = ({
    title,
    description,
    image,
    article = false,
    keywords
}) => {
    const { pathname } = useLocation();
    const siteUrl = 'https://www.calabi.com';
    const defaultTitle = 'Calabi';
    const defaultDescription = 'Calabi builds open infrastructure for collaborative embodied AI—grounded world state from SLAM + VLM fusion, designed for real-time robotics.';
    const defaultImage = '/assets/dark/android-chrome-512x512.png'; // Black logo for light backgrounds

    const imgPath = image || defaultImage;
    const fullImageUrl = imgPath.startsWith('http') ? imgPath : `${siteUrl}${imgPath}`;

    const seo = {
        title: title ? `${title} | Calabi` : defaultTitle,
        description: description || defaultDescription,
        image: fullImageUrl,
        url: `${siteUrl}${pathname}`,
        type: article ? 'article' : 'website'
    };

    return (
        <Helmet title={seo.title}>
            {/* Standard Metrics */}
            <meta name="description" content={seo.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={seo.url} />

            {/* Facebook / Open Graph */}
            <meta property="og:url" content={seo.url} />
            <meta property="og:type" content={seo.type} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
        </Helmet>
    );
};

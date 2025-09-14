import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords, url, image }) => {
  const defaultTitle = "Bounce Kingdom Ghana - Premier Party Rentals";
  const defaultDescription = "Create unforgettable memories with our inflatable bounce houses, water slides, and party equipment in Ghana. Making Your Celebration Extraordinary!";
  const defaultKeywords = "bounce house, water slide, party rental, Ghana, Accra, birthday party, kids party, event rental";
  const defaultUrl = "https://www.bouncekingdomghana.com";
  const defaultImage = "/src/assets/hero-image.jpg";

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || defaultUrl} />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={image || defaultImage} />
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url || defaultUrl} />
    </Helmet>
  );
};

export default SEO;
import React from 'react';
import { Helmet } from 'react-helmet';

const ResponsiveMeta = () => {
  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Bounce Kingdom Ghana" />
      <meta name="theme-color" content="#ff6b6b" />
      
      {/* Responsive design hints */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Helmet>
  );
};

export default ResponsiveMeta;
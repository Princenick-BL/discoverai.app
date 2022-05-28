import React from "react";

const Sitemap = () => {};

export const getServerSideProps = ({ res }) => {
  const baseUrl = {
    development: "http://localhost:5000",
    production: "https://www.discoverai.app",
  }[process.env.NODE_ENV];

  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->
    
    
    <url>
        <loc>https://www.discoverai.app/</loc>
        <lastmod>2022-05-22T00:38:05+00:00</lastmod>
    </url>
    <url>
        <loc>https://www.discoverai.app/contact-us</loc>
        <lastmod>2022-05-22T00:38:05+00:00</lastmod>
    </url>
    <url>
        <loc>https://www.discoverai.app/tool/design/gradient-generator</loc>
        <lastmod>2022-05-22T00:38:05+00:00</lastmod>
    </url>
    
    
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
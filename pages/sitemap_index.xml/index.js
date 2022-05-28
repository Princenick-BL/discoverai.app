import React from "react";

const Sitemap = () => {};

export const getServerSideProps = ({ res }) => {
  const baseUrl = {
    development: "http://localhost:5000",
    production: "https://www.discoverai.app",
  }[process.env.NODE_ENV];

  
  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <!--  created with Free Online Sitemap Generator www.xml-sitemaps.com  -->
      <url>
        <loc>https://www.discoverai.app/</loc>
        <lastmod>2022-05-28T21:18:56+00:00</lastmod>
      </url>
      <url>
        <loc>https://www.discoverai.app/design/gradient-generator</loc>
        <lastmod>2022-05-28T21:18:56+00:00</lastmod>
      </url>
      <url>
        <loc>https://www.discoverai.app/ai/text-to-speach-voxai</loc>
        <lastmod>2022-05-28T21:18:56+00:00</lastmod>
      </url>
      <url>
        <loc>https://www.discoverai.app/tuto/sitemap.xml</loc>
        <lastmod>2022-05-28T21:18:56+00:00</lastmod>
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
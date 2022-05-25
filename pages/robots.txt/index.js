import React from "react";

const Sitemap = () => {};

export const getServerSideProps = ({ res }) => {
  const baseUrl = {
    development: "http://localhost:5000",
    production: "https://www.discoverai.app",
  }[process.env.NODE_ENV];

  
  const sitemap = `
  User-agent: *
  Allow: /
  
  Sitemap: https://www.discoverai.app/sitemap.xml
  `;

  res.setHeader("Content-Type", "text/txt");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
import React from "react";
import { getTuto, getTutos } from "../../../services/tutos";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {

  const baseUrl = {
    development: "http://localhost:3000/tuto/",
    production: "https://www.discoverai.app/tuto/",
  }[process.env.NODE_ENV];

  const tutuoRes = await getTutos("tuto");


  var sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      <!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->
      <url>
        <loc>https://www.discoverai.app/tuto/nodejs-text-to-speech-api-4</loc>
        <lastmod>2022-05-28T00:38:05+00:00</lastmod>
      </url>
      `;

  console.log(tutuoRes)
  if(tutuoRes?.succes){
    tutuoRes?.data.map((tuto,index)=>{
      return sitemap=sitemap+`
        <url>
            <loc>https://www.discoverai.app/tuto/nodejs-text-to-speech-api--4</loc>
            <lastmod>2022-05-28T00:38:05+00:00</lastmod>
        </url>`
    })
  }
  
  sitemap +="</urlset>"
 

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
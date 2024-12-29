import React from "react";

const Head = ({ pageTitle }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>{pageTitle}</title>
        <link rel="stylesheet" href="/css/main.css" />
      </head>
      <body>{/* Add your page content here */}</body>
    </html>
  );
};

export default Head;

import React from 'react';

const Link = ({ href, label }) => (
  <a key={href} href={href} className="Footer-link">
    {label}
  </a>
);

export default Link;

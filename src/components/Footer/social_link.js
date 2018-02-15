import React from 'react';

const SocialLink = ({ href, icon }) => (
  <a
    key={href}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="Footer-socialLink"
  >
    <img src={icon} alt={`${href} logo`} className="Footer-socialLinkIcon" />
  </a>
);

export default SocialLink;

import React from 'react';

import star from './star.svg';
import warrior from './warrior.svg';
import walking from './walking.svg';

export default () => (
  <li className="Location-accommodation">
    <h3 className="Location-subtitle">Mercure Braga Centro</h3>
    <div className="Location-stars">
      <img src={star} alt="" />
      <img src={star} alt="" />
      <img src={star} alt="" />
      <img src={star} alt="" />
    </div>
    <p className="Location-description">
      Largo de S.João do Souto 131, 4700-326 Braga
    </p>
    <p className="Location-description">
      <img src={walking} alt="" className="Location-icon" />
      (10 minutes walking distance to the venue)
    </p>
    <a href="mailto:h9042@accor.com" className="Location-contacts">
      h9042@accor.com
    </a>
    <a href="tel:+351253206000" className="Location-phone">
      +351 253 206 000
    </a>
  </li>
);

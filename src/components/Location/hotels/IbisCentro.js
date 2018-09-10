import React from 'react';

import star from './star.svg';
import warrior from './warrior.svg';
import walking from './walking.svg';

export default () => (
  <li className="Location-accommodation">
    <h3 className="Location-subtitle">Ibis Braga Centro</h3>
    <div className="Location-stars">
      <img src={star} alt="" />
      <img src={star} alt="" />
    </div>
    <p className="Location-description">R. do Carmo 38, 4700-309 Braga</p>
    <p className="Location-description">
      <img src={walking} alt="" className="Location-icon" />
      (23 minutes walking distance to the venue)
    </p>
    <a href="mailto:h9042@accor.com" className="Location-contacts">
      h9042@accor.com
    </a>
    <a href="tel:+351253204800" className="Location-phone">
      +351 253 204 800
    </a>
  </li>
);

import React from 'react';

import star from './star.svg';
import warrior from './warrior.svg';
import walking from './walking.svg';

export default () => (
  <li className="Location-accommodation">
    <h3 className="Location-subtitle">Ibis Budget Braga Centro</h3>
    <div className="Location-stars">
      <img src={star} alt="" />
      <img src={star} alt="" />
    </div>
    <p className="Location-description">Av. da Liberdade 96, 4715-037 Braga</p>
    <p className="Location-description">
      <img src={walking} alt="" className="Location-icon" />
      (8 minutes walking distance to the venue)
    </p>
    <a href="mailto:h9042@accor.com" className="Location-contacts">
      h9042@accor.com
    </a>
    <a href="tel:+351253614500" className="Location-phone">
      +351 253 614 500
    </a>
  </li>
);

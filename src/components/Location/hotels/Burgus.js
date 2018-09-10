import React from 'react';

import star from './star.svg';
import warrior from './warrior.svg';
import walking from './walking.svg';

export default () => (
  <li className="Location-accommodation">
    <h3 className="Location-subtitle">BURGUS Tribute & Design Hotel</h3>
    <div className="Location-stars">
      <img src={star} alt="" />
      <img src={star} alt="" />
      <img src={star} alt="" />
      <img src={star} alt="" />
    </div>
    <p className="Location-description">
      Rua D. Afonso Henriques, 20 a 28 4700-030 Braga
    </p>
    <p className="Location-description">
      <img src={walking} alt="" className="Location-icon" />
      (16 minutes walking distance to the venue)
    </p>
    <a href="mailto:reservas@burgushotel.com" className="Location-contacts">
      reservas@burgushotel.com
    </a>
    <a href="tel:+351253680000" className="Location-phone">
      +351 253 680 000
    </a>

    <p className="Location-contacts">
      <img src={warrior} alt="" className="Location-icon" />
      <img src={warrior} alt="" className="Location-icon hidden" />
      Single standard 69€
    </p>
    <p className="Location-contacts">
      <img src={warrior} alt="" className="Location-icon" />
      <img src={warrior} alt="" className="Location-icon hidden" />
      Single superior 79€
    </p>

    <p className="Location-contacts">
      <img src={warrior} alt="" className="Location-icon" />
      <img src={warrior} alt="" className="Location-icon" />
      Double standard 79€
    </p>

    <p className="Location-contacts">
      <img src={warrior} alt="" className="Location-icon" />
      <img src={warrior} alt="" className="Location-icon" />
      Double superior 89€
    </p>
  </li>
);

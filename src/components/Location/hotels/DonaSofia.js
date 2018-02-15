import React from 'react';

import star from './star.svg';
import warrior from './warrior.svg';
import walking from './walking.svg';

export default () => (
  <li className="Location-accommodation">
    <h3 className="Location-subtitle">Hotel Dona Sofia</h3>
    <div className="Location-stars">
      <img src={star} alt="" />
      <img src={star} alt="" />
      <img src={star} alt="" />
    </div>
    <p className="Location-description">
      Largo de S.João do Souto 131, 4700-326 Braga
    </p>
    <p className="Location-description">
      <img src={walking} alt="" className="Location-icon" />
      (17 minutes walking distance to the venue)
    </p>

    <p className="Location-description">
      Use the following code for reservations: MC18
    </p>
    <br />
    <a href="mailto:info@hoteldonasofia.com" className="Location-contacts">
      info@hoteldonasofia.com
    </a>
    <a href="tel:+351253263160" className="Location-phone">
      +351 253 263 160
    </a>
    <p className="Location-contacts">
      <img src={warrior} alt="" className="Location-icon" />
      <img src={warrior} alt="" className="Location-icon hidden" />
      <img src={warrior} alt="" className="Location-icon hidden" />
      Single 40€
    </p>
    <p className="Location-contacts">
      <img src={warrior} alt="" className="Location-icon" />
      <img src={warrior} alt="" className="Location-icon" />
      <img src={warrior} alt="" className="Location-icon hidden" />
      Double/Twin 50€
    </p>
    <p className="Location-contacts">
      <img src={warrior} alt="" className="Location-icon" />
      <img src={warrior} alt="" className="Location-icon" />
      <img src={warrior} alt="" className="Location-icon" />
      Triple 60€
    </p>
    <p className="Location-contacts">
      <img src={warrior} alt="" className="Location-icon" />
      <img src={warrior} alt="" className="Location-icon" />
      <img src={warrior} alt="" className="Location-icon hidden" />
      Suite 70€
    </p>
  </li>
);

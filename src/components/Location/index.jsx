import React, { Component } from 'react';

import './index.css';

import star from './star.svg';
import banner from './banner.svg';
import walking from './walking.svg';
import warrior from './warrior.svg';
import tapLogo from './tap_logo.png';
import locationBackground from './peb.svg';
import accommodationBackground from './accommodation_background.svg';

export default class Location extends Component {
  render() {
    return (
      <section className="Location" id="location">
        <div className="Location-wrapper">
          <div className="Location-venue">
            <h2 className="Location-title">Location</h2>
            <div className="Location-venueWrapper">
              <div className="Location-content">
                <h3 className="Location-subtitle">
                  PEB - Parque de exposiçōes de Braga
                </h3>
                <p className="Location-description">
                  Mirror Conf will take place in Braga, a beautiful, friendly
                  city surrounded by stunning mountains and one of the oldest
                  portuguese cities, established in Roman times as Bracara
                  Avgvsta.
                  <br />
                  The venue for Mirror Conf will be the brand new PEB, Parque de
                  exposiçōes de Braga.
                </p>
              </div>
              <div className="Location-sectionBackground">
                <img
                  className="Location-backgroundImage"
                  src={locationBackground}
                />
              </div>
            </div>
          </div>

          <div className="Location-accommodations">
            <h2 className="Location-title">Where to stay</h2>
            <div className="Location-columnContainer">
              <ul>
                <li className="Location-accommodation">
                  <h3 className="Location-subtitle">Hotel Dona Sofia</h3>
                  <div className="Location-stars">
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                  </div>
                  <p className="Location-description">
                    Largo de S.João do Souto 131, 4700-326 Braga
                  </p>
                  <p className="Location-description">
                    <img src={walking} className="Location-icon" />(4 minutes
                    walking distance to the venue)
                  </p>
                  <p className="Location-contacts">info@hoteldonasofia.com</p>
                  <p className="Location-phone">+351 253 263 160</p>
                  <p className="Location-contacts">
                    <img src={warrior} className="Location-icon" />
                    <img src={warrior} className="Location-icon hidden" />
                    Single 45€
                  </p>

                  <p className="Location-contacts">
                    <img src={warrior} className="Location-icon" />
                    <img src={warrior} className="Location-icon" /> Double 52€
                  </p>
                </li>

                <li className="Location-accommodation">
                  <h3 className="Location-subtitle">Hotel Ibis Centro</h3>
                  <div className="Location-stars">
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                  </div>
                  <p className="Location-description">
                    Largo de S.João do Souto 131, 4700-326 Braga
                  </p>
                  <p className="Location-description">
                    <img src={walking} className="Location-icon" />(4 minutes
                    walking distance to the venue)
                  </p>
                  <p className="Location-contacts">info@hoteldonasofia.com</p>
                  <p className="Location-phone">+351 253 263 160</p>
                  <p className="Location-contacts">
                    <img src={warrior} className="Location-icon" />
                    <img src={warrior} className="Location-icon hidden" />
                    Single 45€
                  </p>

                  <p className="Location-contacts">
                    <img src={warrior} className="Location-icon" />
                    <img src={warrior} className="Location-icon" /> Double 52€
                  </p>
                </li>
              </ul>
              <div className="Location-sectionBackground">
                <img src={accommodationBackground} />
              </div>
            </div>
          </div>

          <div className="Location-directions">
            <h2 className="Location-title">Getting to Braga</h2>
            <ul className="Location-columnContainer">
              <li className="Location-direction">
                <h3 className="Location-subtitle">From Porto Airport (OPO)</h3>
                <p className="Location-description">
                  The closes airport is in Porto (OPO), from where you can
                  either:
                </p>
                <p className="Location-description">
                  1. Catch a direct bus with{' '}
                  <a className="Location-link" href="https://www.getbus.eu/en/">
                    a service called GetBus;
                  </a>
                </p>
                <p className="Location-description">
                  2. Catch{' '}
                  <a
                    className="Location-link"
                    href="https://www.cp.pt/passageiros/en"
                  >
                    a train
                  </a>{' '}
                  at{' '}
                  <a
                    className="Location-link"
                    href="https://www.cp.pt/passageiros/en/train-times/Stations/porto-campanha-station"
                  >
                    Porto Campanhã to Braga
                  </a>{' '}
                  (~ 1 hour trip).
                </p>
              </li>

              <img src={banner} className="Location-banner desktop" />

              <li className="Location-direction">
                <h3 className="Location-subtitle">From Lisbon Airport (LIS)</h3>
                <p className="Location-description">
                  If you want to land in Lisbon, you can catch{' '}
                  <a
                    className="Location-link"
                    href="https://www.cp.pt/passageiros/en"
                  >
                    a train
                  </a>{' '}
                  at{' '}
                  <a
                    className="Location-link"
                    href="https://www.cp.pt/passageiros/en/train-times/Stations/lisboa-oriente-station"
                  >
                    Lisboa Oriente to Braga
                  </a>{' '}
                  (~ 4 hours trip).
                </p>
              </li>
            </ul>
            <img src={banner} className="Location-banner" />
          </div>

          <div className="Location-flightDiscount">
            <div className="Location-columnContainer">
              <div className="Location-airlineLogo">
                <h3 className="Location-subtitle">Flight Discount</h3>
                <img className="Location-tapLogo" src={tapLogo} />
              </div>
              <div className="Location-flightDiscountDescription">
                <p className="Location-description">
                  Our official airline, TAP Portugal, is giving a discount code
                  to all attendees. If you are traveling in tourist class you
                  will have a 10% discount. If traveling in business class you
                  will get 15% discount.
                </p>
              </div>
            </div>
            <div className="Location-actions">
              <a
                className="Location-cta"
                href="https://2017.mirrorconf.com/1a7082ddf43ef9a16374eb674e6daee3.pdf"
              >
                Get your code
              </a>
              <a
                className="Location-cta alternate"
                href="https://ti.to/subvisual/mirror-conf-2018/with/krxd0s3-khw"
              >
                Buy your ticket
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

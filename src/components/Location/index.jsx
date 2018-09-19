import React, { Component } from 'react';

import './index.css';

import path from './path.svg';
import banner from './banner.svg';
import locationBackground from './forum-illustration.png';
import accommodationBackground from './accommodation_background.svg';

import { Burgus, Mercure, DonaSofia, IbisCentro, IbisBudget } from './hotels';

export default class Location extends Component {
  render() {
    return (
      <section className="Location" id="location">
        <div className="Location-venue">
          <h2 className="Location-title">Location</h2>
          <div className="Location-venueWrapper">
            <div className="Location-content">
              <h3 className="Location-subtitle">Forum Braga</h3>
              <p className="Location-description">
                Mirror Conf will take place in Braga, a beautiful, friendly city
                surrounded by stunning mountains and one of the oldest
                portuguese cities, established in Roman times as Bracara
                Avgvsta.
                <br />
                The venue for Mirror Conf will be the brand new Forum Braga.
              </p>
            </div>
            <div className="Location-sectionBackground">
              <img
                className="Location-backgroundImage"
                src={locationBackground}
                alt=""
              />
            </div>
          </div>
          <img style={{ maxWidth: '100%' }} alt="" src={path} />
        </div>

        <div className="Location-accommodations">
          <h2 className="Location-title">Where to stay</h2>
          <div className="Location-columnContainer">
            <ul>
              <Burgus />
              <Mercure />
              <DonaSofia />
              <IbisCentro />
              <IbisBudget />
            </ul>
            <div className="Location-sectionBackground">
              <img
                className="Location-backgroundImage"
                src={accommodationBackground}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="Location-directions">
          <h2 className="Location-title">Getting to Braga</h2>
          <ul className="Location-columnContainer">
            <li className="Location-direction">
              <h3 className="Location-subtitle">From Porto Airport (OPO)</h3>
              <p className="Location-description">
                The closes airport is in Porto (OPO), from where you can either:
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

            <img src={banner} alt="" className="Location-banner desktop" />

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
          <img src={banner} alt="" className="Location-banner" />
        </div>
        <div className="Location-transition"></div>
      </section>
    );
  }
}

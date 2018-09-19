import React, { Component } from 'react';

import './index.css';

import Link from './link';
import Subtitle from './subtitle';
import SocialLink from './social_link';

import Hero from './hero.svg';
import Twitter from './twitter.svg';
import Youtube from './youtube.svg';
import Facebook from './facebook.svg';
import MirrorLogo from './logo.svg';

const siteMap = [
  { label: 'About', href: '#about' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Workshops', href: '#workshops' },
  { label: 'Location', href: '#location' },
].map(Link);

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/mirrorconf/' },
  { icon: Twitter, href: 'https://twitter.com/MirrorConf' },
  {
    icon: Youtube,
    href: 'https://www.youtube.com/channel/UCDez53TT1_v3jr3lGv-QhKw',
  },
].map(SocialLink);

export default class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <div className="Footer-content">
          <div className="Footer-columns">
            <div className="Footer-column">
              <div className="Footer-logoWrapper">
                <img
                  src={MirrorLogo}
                  className="Footer-logo"
                  alt="Mirror Conf's logo"
                />
                <Subtitle>Mirror Conf</Subtitle>
              </div>
            </div>
            <div className="Footer-largeColumn">
              <Subtitle>Find Your Way</Subtitle>
              <div className="Footer-columns">
                <div className="Footer-column">{siteMap}</div>
                <div className="Footer-column">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://ti.to/subvisual/mirror-conf-2018"
                    className="Footer-link"
                  >
                    Buy your ticket
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.papercall.io/mirrorconf2018"
                    className="Footer-link"
                  >
                    Call for Speakers
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/sponsorship_prospectus_2018.pdf"
                    className="Footer-link"
                  >
                    Sponsor Us
                  </a>
                </div>
              </div>
            </div>
            <div className="Footer-column">
              <Subtitle>Follow Us</Subtitle>
              {socialLinks}
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

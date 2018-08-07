import React, { Component } from 'react';

import './index.css';

import back from './back.svg';
import mouse from './mouse.svg';
import header from './header.svg';
import twitter from './twitter.svg';
import headerMobile from './header-mobile.svg';
import footer from './footer.svg';

const renderLinkIcon = icon => {
  if (!icon) return;

  return <img alt="" src={icon} className="SpeakerPage-linkIcon" />;
};

const renderLink = (href, label, icon) => {
  if (!href || !label) return;

  return (
    <a className="SpeakerPage-link" href={href}>
      {renderLinkIcon(icon)}
      {label}
    </a>
  );
};

export default class SpeakerPage extends Component {
  render() {
    return (
      <section className="SpeakerPage">
        <div className="SpeakerPage-contentWrapper">
          <img className="SpeakerPage-header" alt="" src={header} />
          <img
            alt=""
            src={headerMobile}
            className="SpeakerPage-header is-mobile"
          />
          <nav className="SpeakerPage-navigation">
            {renderLink('/#speakers', 'Go back', back)}
          </nav>
          <div className="SpeakerPage-content">
            <div className="SpeakerPage-information">
              <div className="SpeakerPage-overview">
                <h1 className="SpeakerPage-name">{this.props.name}</h1>
                <img
                  alt=""
                  src={this.props.photo}
                  className="SpeakerPage-picture"
                />
                <div className="SpeakerPage-speakerLinks">
                  {renderLink(this.props.website, 'Website', mouse)}
                  {renderLink(this.props.twitter, 'Twitter', twitter)}
                  <p className="SpeakerPage-dateTime">{this.props.dateTime}</p>
                </div>
              </div>
              <div className="SpeakerPage-details">{this.props.body}</div>
            </div>
          </div>
          <nav className="SpeakerPage-footerNavigation ">
            {renderLink('/#speakers', 'Go back', back)}
          </nav>
        </div>
        <img className="SpeakerPage-footer" alt="" src={footer} />
      </section>
    );
  }
}

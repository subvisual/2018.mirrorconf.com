import React, { Component } from 'react';

import './index.css';

import mouse from './mouse.svg';
import twitter from './twitter.svg';

const renderLinkIcon = icon => {
  if (!icon) return;

  return <img alt="" src={icon} className="SpeakerSection-linkIcon" />;
};

const renderLink = (href, label, icon) => {
  if (!href || !label) return;

  return (
    <a className="SpeakerSection-link" href={href}>
      {renderLinkIcon(icon)}
      {label}
    </a>
  );
};

export default class SpeakerSection extends Component {
  render() {
    return (
      <section id={this.props.slug} className="SpeakerSection">
        <div className="SpeakerSection-overview">
          <h1 className="SpeakerSection-name">{this.props.name}</h1>
          <img
            alt=""
            src={this.props.photo}
            className="SpeakerSection-picture"
          />
          <div className="SpeakerSection-speakerLinks">
            {renderLink(this.props.website, 'Website', mouse)}
            {renderLink(this.props.twitter, 'Twitter', twitter)}
            <p className="SpeakerSection-dateTime">{this.props.dateTime}</p>
          </div>
        </div>
        <div className="SpeakerSection-details">{this.props.body}</div>
      </section>
    );
  }
}

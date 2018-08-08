import React, { Component } from 'react';
import parser from 'html-react-parser';

import SpeakerSection from '../SpeakerSection';

import './index.css';

import back from './back.svg';
import header from './header.svg';
import headerMobile from './header-mobile.svg';
import footer from './footer.svg';

const renderLinkIcon = icon => {
  if (!icon) return;

  return <img alt="" src={icon} className="SpeakerSections-linkIcon" />;
};

const renderLink = (href, label, icon) => {
  if (!href || !label) return;

  return (
    <a className="SpeakerSections-link" href={href}>
      {renderLinkIcon(icon)}
      {label}
    </a>
  );
};

const renderSection = ({ node: { frontmatter, html } }, index) => {
  const body = parser(html);

  return <SpeakerSection key={index} {...frontmatter} body={body} />;
};

export default class SpeakerSections extends Component {
  render() {
    return (
      <div className="SpeakerSections">
        <div className="SpeakerSections-contentWrapper">
          <img className="SpeakerSections-header" alt="" src={header} />
          <img
            alt=""
            src={headerMobile}
            className="SpeakerSections-header is-mobile"
          />
          <nav className="SpeakerSections-navigation">
            {renderLink('/#speakers', 'Go back', back)}
          </nav>
          <div className="SpeakerSections-content">
            {this.props.sections.map(renderSection)}
          </div>
          <nav className="SpeakerSections-footerNavigation ">
            {renderLink('/#speakers', 'Go back', back)}
          </nav>
        </div>
        <img className="SpeakerSections-footer" alt="" src={footer} />
      </div>
    );
  }
}

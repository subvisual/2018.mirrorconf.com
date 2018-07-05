import classNames from 'classnames';
import React, { Component } from 'react';

import Button from '../Button';
import TextShadow from '../TextShadow';
import OverlayImage from './OverlayImage';

import IconDate from './icon-date.png';
import IconTicket from './icon-ticket.png';

import './index.css';

const isOdd = number => number % 2;

export default class Workshop extends Component {
  render() {
    const {
      path,
      time,
      date,
      title,
      index,
      photo,
      overlay,
      speaker,
      excerpt,
    } = this.props;

    const className = classNames({
      Workshop: true,
      'Workshop--alternate': isOdd(index),
    });

    return (
      <div id={path} className={className}>
        <div className="Workshop-column">
          <TextShadow className="Workshop-titleMobile">
            <h3 className="Workshop-title">{title}</h3>
          </TextShadow>
          <OverlayImage alt="Mike" src={photo} overlay={overlay} />
          <h4 className="Workshop-speaker">by {speaker}</h4>
          <div className="Workshop-information">
            <TextShadow>
              <img className="Workshop-icon" alt="" src={IconTicket} />
              <p className="Workshop-price">350€</p>
              <p className="Workshop-discountPrice">
                300€ with Conference Ticket
              </p>
            </TextShadow>
            <TextShadow>
              <img className="Workshop-icon" alt="" src={IconDate} />
              <p className="Workshop-date">{date}</p>
              <p className="Workshop-day">{time}</p>
            </TextShadow>
          </div>
          <div className="Workshop-actions">
            <Button fullWidth href="https://ti.to/subvisual/mirror-conf-2018/">
              Buy your ticket
            </Button>
          </div>
        </div>
        <div className="Workshop-column">
          <TextShadow>
            <h3 className="Workshop-title">{title}</h3>
          </TextShadow>
          <p className="Workshop-description">{excerpt}</p>
          <div className="Workshop-actions">
            <Button href={path}>Read More</Button>
          </div>
        </div>
      </div>
    );
  }
}

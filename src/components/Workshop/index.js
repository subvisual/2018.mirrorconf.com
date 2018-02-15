import classNames from 'classnames';
import React, { Component } from 'react';

import Button from '../Button';
import OverlayImage from './OverlayImage';

import './index.css';

const isOdd = number => number % 2;

export default class Workshop extends Component {
  render() {
    const {
      day,
      date,
      title,
      index,
      picture,
      overlay,
      speakerName,
      description,
    } = this.props;

    const className = classNames({
      Workshop: true,
      'Workshop--alternate': isOdd(index),
    });

    return (
      <div className={className}>
        <div className="Workshop-column">
          <div className="Workshop-dateTime">
            <p className="Workshop-day">{day}</p>
            <p className="Workshop-date">{date}</p>
          </div>
          <OverlayImage alt="Mike" src={picture} overlay={overlay} />
          <div className="Workshop-actions">
            <div>
              <p className="Workshop-price">400€</p>
              <p className="Workshop-discountPrice">250€ with Full Ticket</p>
            </div>
            <Button>Buy your ticket</Button>
          </div>
        </div>
        <div className="Workshop-column">
          <h3 className="Workshop-title">{title}</h3>
          <h4 className="Workshop-speaker">with {speakerName}</h4>
          <p className="Workshop-description">{description}</p>
        </div>
      </div>
    );
  }
}

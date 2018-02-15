import React, { Component } from 'react';

import './index.css';

import schedule from './schedule.png';
import scheduleMobile from './schedule-mobile.png';

export default class Schedule extends Component {
  render() {
    return (
      <section className="Schedule" id="schedule">
        <div className="Schedule-images">
          <img className="Schedule-image" src={schedule} />
          <img className="Schedule-mobileImage" src={scheduleMobile} />
        </div>
        <div className="Schedule-content">
          <h2 className="Schedule-title">Schedule</h2>
          <p className="Schedule-description">
            This year’s Mirror Conf promises to be even bigger and better. A
            privileged source told us that “there will be 6 workshops by some of
            the best people in the industry, focusing on design, user
            experience, front-end development and product. Not only that, but
            this new edition of Mirror Conf will feature a lot more fringe
            events and surprises that will surely delight all attendees. This is
            one conference you don’t want to miss!“. Check the schedule for the
            whole event here.
          </p>
          <a className="Schedule-link" href="/schedule">
            Full Schedule
          </a>
        </div>
      </section>
    );
  }
}

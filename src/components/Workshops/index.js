import React, { Component } from 'react';

import Light from '../Light';
import Workshop from '../Workshop';

import './index.css';
import Overlay from './mike-illustration.svg';
import MikePicture from './mike.png';

const WORKSHOPS = [
  {
    picture: MikePicture,
    overlay: Overlay,
    title: 'Design is a Job',
    speakerName: 'Mike Monteiro',
    day: 'Day 1',
    date: 'October 15th - 10AM',
    description: `
      Ask 10 people what a product roadmap is and you will get 10
      different answers! This artifact is an often misunderstood
      component of product development, but an incredibly important
      one to get right. Creating a great one is part art and part
      science. In this session we will talk through the real purpose
      of a roadmap and how it can be used to get the most out of your
      project and team. We'll unpack the key steps in the process such
      as product visioning, themes, prioritization and stakeholder
      buy-in and alignment as well as and shed some light on the tools
      and frameworks that can be used to ensure a successful
      roadmapping effort.`,
  },
  {
    picture: MikePicture,
    overlay: Overlay,
    title: 'Design is a Job',
    speakerName: 'Mike Monteiro',
    day: 'Day 1',
    date: 'October 15th - 10AM',
    description: `
      Ask 10 people what a product roadmap is and you will get 10
      different answers! This artifact is an often misunderstood
      component of product development, but an incredibly important
      one to get right. Creating a great one is part art and part
      science. In this session we will talk through the real purpose
      of a roadmap and how it can be used to get the most out of your
      project and team. We'll unpack the key steps in the process such
      as product visioning, themes, prioritization and stakeholder
      buy-in and alignment as well as and shed some light on the tools
      and frameworks that can be used to ensure a successful
      roadmapping effort.`,
  },
];

export default class Workshops extends Component {
  renderWorkshop = (workshop, index) => {
    return (
      <li key={index} className="Workshops-listItem">
        <Workshop index={index} {...workshop} />
      </li>
    );
  };

  renderWorkshops() {
    return (
      <ul className="Workshops-list">{WORKSHOPS.map(this.renderWorkshop)}</ul>
    );
  }

  render() {
    return (
      <section className="Workshops">
        <Light />
        <div className="Workshops-wrapper">{this.renderWorkshops()}</div>
      </section>
    );
  }
}

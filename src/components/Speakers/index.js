import _ from 'lodash';
import React, { Component } from 'react';
import { listen, tween, styler } from 'popmotion';

import './index.css';

import car from './car.png';
import Background from './background.js';

import { setVariable } from '../../utils/css';
import { scrollRemaining } from '../../utils/dom';

export default class Speakers extends Component {
  componentDidMount() {
    const body = styler(document.querySelector('body'));
    console.log(body.get('--bg-color'));

    const carTween = tween({
      from: { y: 0, scale: 1 },
      to: { y: -36, scale: 0.15 },
    })
      .start(values => {
        setVariable('--Speakers-car-scale', values.scale);
        setVariable('--Speakers-car-translate-y', `${values.y}%`);
      })
      .pause();

    const backgroundTween = tween({ from: -100, to: 0 })
      .start(value => {
        setVariable('--Speakers-scroll-progress', `${value}%`);
        setVariable('--Speakers-scroll-progress-vh', `${-value}vh`);
        console.log(body.get('--Speakers-car-scale'));
      })
      .pause();

    listen(document, 'scroll')
      .pipe(scrollRemaining)
      .start(progress => {
        carTween.seek(progress);
        backgroundTween.seek(progress);
      });
  }

  render() {
    return (
      <section className="Speakers">
        <div className="Speakers-backgroundWrapper">
          <Background />
        </div>
      </section>
    );
  }
}

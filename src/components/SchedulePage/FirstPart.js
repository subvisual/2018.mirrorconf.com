import React from 'react';

import { Container, Column, Row } from './AnimatedTable';

export default (
  <div title="15, 16 & 17 October">
    <Container className="SchedulePage-columns is-firstPart">
      <Column className="SchedulePage-column">
        <Row className="SchedulePage-row">
          <h2 className="SchedulePage-title no-topMargin">15</h2>
        </Row>

        <Container className="SchedulePage-columns">
          <Column className="SchedulePage-column">
            <Row className="SchedulePage-row">
              <h3 className="SchedulePage-room no-locationDot">
                Gnration <br /> Room 1
              </h3>
            </Row>

            <Row className="SchedulePage-entry">
              <p className="SchedulePage-entryTime">10:00</p>
              <a
                href="/designing-calm-technology"
                className="SchedulePage-entryTitle"
              >
                Designing Calm Technology pt.1{' '}
                <span className="SchedulePage-entrySpeaker">by Amber Case</span>
              </a>
            </Row>

            <Row className="SchedulePage-entry is-small">
              <p className="SchedulePage-entryTime">13:00</p>
              <p className="SchedulePage-entryTitle">Lunch</p>
            </Row>

            <Row className="SchedulePage-entry">
              <p className="SchedulePage-entryTime">14:00</p>
              <a
                href="/designing-calm-technology"
                className="SchedulePage-entryTitle"
              >
                Designing Calm Technology pt.2{' '}
                <span className="SchedulePage-entrySpeaker">by Amber Case</span>
              </a>
            </Row>
          </Column>

          <Column className="SchedulePage-column">
            <Row className="SchedulePage-row">
              <h3 className="SchedulePage-room no-locationDot">
                Gnration <br /> Room 2
              </h3>
            </Row>

            <Row className="SchedulePage-entry">
              <p className="SchedulePage-entryTime">10:00</p>
              <a
                href="/smart-responsive-interface-design-patterns"
                className="SchedulePage-entryTitle"
              >
                Smart Responsive Interface Design Patterns pt.1{' '}
                <span className="SchedulePage-entrySpeaker">
                  by Vitaly Friedman
                </span>
              </a>
            </Row>

            <Row className="SchedulePage-entry is-small">
              <p className="SchedulePage-entryTime">13:00</p>
              <p className="SchedulePage-entryTitle">Lunch</p>
            </Row>

            <Row className="SchedulePage-entry">
              <p className="SchedulePage-entryTime">14:00</p>
              <a
                href="/smart-responsive-interface-design-patterns"
                className="SchedulePage-entryTitle"
              >
                Smart Responsive Interface Design Patterns pt.2{' '}
                <span className="SchedulePage-entrySpeaker">
                  by Vitaly Friedman
                </span>
              </a>
            </Row>
          </Column>
        </Container>
      </Column>

      <Column className="SchedulePage-column">
        <Row className="SchedulePage-row">
          <h2 className="SchedulePage-title">16</h2>
        </Row>

        <Container className="SchedulePage-columns">
          <Column className="SchedulePage-column">
            <Row className="SchedulePage-row">
              <h3 className="SchedulePage-room no-locationDot">
                Gnration <br /> Room 1
              </h3>
            </Row>
            <Row className="SchedulePage-entry">
              <p className="SchedulePage-entryTime">10:00</p>
              <a href="/design-is-a-job" className="SchedulePage-entryTitle">
                Design is a Job pt.1{' '}
                <span className="SchedulePage-entrySpeaker">
                  by Mike Monteiro
                </span>
              </a>
            </Row>
            <Row className="SchedulePage-entry is-small">
              <p className="SchedulePage-entryTime">13:00</p>
              <p className="SchedulePage-entryTitle">Lunch</p>
            </Row>
            <Row className="SchedulePage-entry">
              <p className="SchedulePage-entryTime">14:00</p>
              <a href="/design-is-a-job" className="SchedulePage-entryTitle">
                Design is a Job pt.2{' '}
                <span className="SchedulePage-entrySpeaker">
                  by Mike Monteiro
                </span>
              </a>
            </Row>
          </Column>

          <Column className="SchedulePage-column">
            <Row className="SchedulePage-row">
              <h3 className="SchedulePage-room no-locationDot">
                Gnration <br /> Room 2
              </h3>
            </Row>
            <Row className="SchedulePage-entry">
              <p className="SchedulePage-entryTime">10:00</p>
              <a
                href="/jobs-to-be-done-for-better-product-strategy"
                className="SchedulePage-entryTitle"
              >
                Jobs-to-Be-Done for Better Product Strategy pt.1{' '}
                <span className="SchedulePage-entrySpeaker">
                  by Stephanie Troeth
                </span>
              </a>
            </Row>
            <Row className="SchedulePage-entry is-small">
              <p className="SchedulePage-entryTime">13:00</p>
              <p className="SchedulePage-entryTitle">Lunch</p>
            </Row>
            <Row className="SchedulePage-entry">
              <p className="SchedulePage-entryTime">14:00</p>
              <a
                href="/jobs-to-be-done-for-better-product-strategy"
                className="SchedulePage-entryTitle"
              >
                Jobs-to-Be-Done for Better Product Strategy pt.2{' '}
                <span className="SchedulePage-entrySpeaker">
                  by Stephanie Troeth
                </span>
              </a>
            </Row>
          </Column>
        </Container>
        <Container className="SchedulePage-columns">
          <Column className="SchedulePage-column">
            <Row className="SchedulePage-row">
              <h3 className="SchedulePage-room">Braga City Center</h3>
            </Row>
            <Row className="SchedulePage-entry  is-small">
              <p className="SchedulePage-entryTime">16:00</p>
              <p className="SchedulePage-entryTitle">Free Walking Tour</p>
            </Row>
            <Row className="SchedulePage-row">
              <h3 className="SchedulePage-room">Startup Braga, Gnration</h3>
            </Row>
            <Row className="SchedulePage-entry no-margin">
              <p className="SchedulePage-entryTime">18:30</p>
              <p className="SchedulePage-entryTitle">
                Meetup:{' '}
                <span className="SchedulePage-entrySpeaker">
                  Braga.Design + Braga.JS
                </span>
              </p>
            </Row>
          </Column>
        </Container>
      </Column>
      <Column className="SchedulePage-column">
        <Row className="SchedulePage-row">
          <h2 className="SchedulePage-title">17</h2>
        </Row>
        <Container className="SchedulePage-columns">
          <Column className="SchedulePage-column">
            <Row className="SchedulePage-row">
              <h3 className="SchedulePage-room no-locationDot">
                Gnration <br /> Room 1
              </h3>
            </Row>
            <Row className="SchedulePage-entry">
              <p className="SchedulePage-entryTime">10:00</p>
              <a href="/css-in-2018" className="SchedulePage-entryTitle">
                CSS in 2018 pt.1{' '}
                <span className="SchedulePage-entrySpeaker">
                  by Lea Verou & Chris Lilley
                </span>
              </a>
            </Row>
            <Row className="SchedulePage-entry is-small">
              <p className="SchedulePage-entryTime">13:00</p>
              <p className="SchedulePage-entryTitle">Lunch</p>
            </Row>
            <Row className="SchedulePage-entry">
              <p className="SchedulePage-entryTime">14:00</p>
              <a href="/css-in-2018" className="SchedulePage-entryTitle">
                CSS in 2018 pt.2{' '}
                <span className="SchedulePage-entrySpeaker">
                  by Lea Verou & Chris Lilley
                </span>
              </a>
            </Row>
          </Column>
          <Column className="SchedulePage-column">
            <Row className="SchedulePage-row">
              <h3 className="SchedulePage-room no-locationDot">
                Gnration <br /> Room 2
              </h3>
            </Row>
            <Row className="SchedulePage-entry">
              <p className="SchedulePage-entryTime">10:00</p>
              <a
                href="/designing-for-delight"
                className="SchedulePage-entryTitle"
              >
                Designing for Delight pt.1{' '}
                <span className="SchedulePage-entrySpeaker">
                  by Jared Spool & Dana Chisnell
                </span>
              </a>
            </Row>
            <Row className="SchedulePage-entry is-small">
              <p className="SchedulePage-entryTime">13:00</p>
              <p className="SchedulePage-entryTitle">Lunch</p>
            </Row>
            <Row className="SchedulePage-entry">
              <p className="SchedulePage-entryTime">14:00</p>
              <a
                href="/designing-for-delight"
                className="SchedulePage-entryTitle"
              >
                Designing for Delight pt.2{' '}
                <span className="SchedulePage-entrySpeaker">
                  by Jared Spool & Dana Chisnell
                </span>
              </a>
            </Row>
          </Column>
        </Container>
        <Container className="SchedulePage-columns">
          <Column className="SchedulePage-column">
            <Row className="SchedulePage-row">
              <h3 className="SchedulePage-room">Braga City Center</h3>
            </Row>
            <Row className="SchedulePage-entry is-small">
              <p className="SchedulePage-entryTime">16:00</p>
              <p className="SchedulePage-entryTitle">Free Walking Tour</p>
            </Row>
            <Row className="SchedulePage-row">
              <h3 className="SchedulePage-room">Startup Braga, Gnration</h3>
            </Row>
            <Row className="SchedulePage-entry no-margin">
              <p className="SchedulePage-entryTime">18:30</p>
              <p className="SchedulePage-entryTitle">Welcome Drinks</p>
            </Row>
          </Column>
        </Container>
      </Column>
    </Container>
  </div>
);

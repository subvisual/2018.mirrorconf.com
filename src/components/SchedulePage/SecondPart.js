import React from 'react';

import { Container, Column, Row } from './AnimatedTable';

const Xing = (
  <a
    className="SchedulePage-link"
    href="https://www.xing.com/en"
    target="_blank"
    rel="noopener noreferrer"
  >
    sponsored by Xing
  </a>
);

const Ginetta = (
  <a
    target="_blank"
    rel="noopener noreferrer"
    className="SchedulePage-link"
    href="https://ginetta.net/"
  >
    hosted by Ginetta
  </a>
);

export default (
  <div title="18 & 19 October">
    <Container className="SchedulePage-columns">
      <Column className="SchedulePage-column">
        <Row className="SchedulePage-row">
          <h2 className="SchedulePage-title no-topMargin">18</h2>
        </Row>
        <Row className="SchedulePage-row">
          <a
            href="https://www.google.pt/maps/place/Altice+Forum+Braga/@41.5414507,-8.4246834,17z/data=!3m1!4b1!4m5!3m4!1s0xd24fc6519e03b3d:0xb47f5e1a7515bd95!8m2!3d41.5414467!4d-8.4224894"
            className="SchedulePage-room"
          >
            Altice Forum Braga <br /> Main Room
          </a>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">09:00</p>
          <p className="SchedulePage-entryTitle">Check in</p>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">09:50</p>
          <p className="SchedulePage-entryTitle">Opening</p>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">10:00</p>
          <a href="/speakers#jared-spool" className="SchedulePage-entryTitle">
            Design is a team sport{' '}
            <span className="SchedulePage-entrySpeaker">by Jared Spool</span>
          </a>
        </Row>

        <Row className="SchedulePage-entry xl">
          <p className="SchedulePage-entryTime">10:45</p>
          <a
            href="/speakers#stephanie-troeth"
            className="SchedulePage-entryTitle"
          >
            TBA{' '}
            <span className="SchedulePage-entrySpeaker">Stephanie Troeth</span>
          </a>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">11:30</p>
          <p className="SchedulePage-entryTitle">Coffe Break {Xing}</p>
          <p className="SchedulePage-entryTitle">
            Talk Shop{' '}
            <span className="SchedulePage-entrySpeaker">
              with Jared Spool and Stephanie Troeth
            </span>
          </p>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">12:15</p>
          <a href="/speakers#rails-girls" className="SchedulePage-entryTitle">
            Hurdles of Junior Developers and How To Overcome Them{' '}
            <span className="SchedulePage-entrySpeaker">
              by Sabine van der Eijk & Alina Leuca
            </span>
          </a>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">13:00</p>
          <p className="SchedulePage-entryTitle">Lunch</p>
        </Row>

        <Row className="SchedulePage-entry l">
          <p className="SchedulePage-entryTime">15:00</p>
          <a href="/speakers#arne-kittler" className="SchedulePage-entryTitle">
            Clarity in Collaboration{' '}
            <span className="SchedulePage-entrySpeaker">by Arne Kittler</span>
          </a>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">15:30</p>
          <p className="SchedulePage-entryTitle">
            Talk Shop{' '}
            <span className="SchedulePage-entrySpeaker">
              with Sabine van der Eijk, Alina Leuca and Arne Kittler
            </span>
          </p>
        </Row>

        <Row className="SchedulePage-entry xl">
          <p className="SchedulePage-entryTime">15:45</p>
          <a
            href="/speakers#vivianne-castillo"
            className="SchedulePage-entryTitle"
          >
            Ethics & Power: Understanding the Role of Shame in UX Research{' '}
            <span className="SchedulePage-entrySpeaker">Vivianne Castillo</span>
          </a>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">16:15</p>
          <p className="SchedulePage-entryTitle">Coffe Break {Xing}</p>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">17:00</p>
          <a href="/speakers#lea-verou" className="SchedulePage-entryTitle">
            Even More CSS Secrets{' '}
            <span className="SchedulePage-entrySpeaker">by Lea Verou</span>
          </a>
        </Row>

        <Row className="SchedulePage-entry xl">
          <p className="SchedulePage-entryTime">18:00</p>
          <p className="SchedulePage-entryTitle">
            Talk Shop{' '}
            <span className="SchedulePage-entrySpeaker">
              with Vivianne Castillo and Lea Verou
            </span>
          </p>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">18:15</p>
          <p className="SchedulePage-entryTitle">
            Mirror Quiz{' '}
            <span className="SchedulePage-entrySpeaker">
              hosted by Miguel Palhas ❤︎
            </span>
          </p>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">19:00</p>
          <p className="SchedulePage-entryTitle">Closing</p>
        </Row>

        <Row className="SchedulePage-row">
          <a
            href="https://www.google.pt/maps/place/ArtBar+Old+House/@41.5537646,-8.3762957,17z/data=!3m1!4b1!4m5!3m4!1s0xd24fc6ac9da79bd:0x7a403b0ed0998a69!8m2!3d41.5537606!4d-8.3741017"
            className="SchedulePage-room"
          >
            Casa Velha, Parque da Ponte
          </a>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">21:00</p>
          <p className="SchedulePage-entryTitle">MirrorConf Party {Ginetta}</p>
        </Row>
      </Column>
      <Column className="SchedulePage-column">
        <Row className="SchedulePage-row">
          <h2 className="SchedulePage-title">19</h2>
        </Row>

        <Row className="SchedulePage-row">
          <a
            href="https://www.google.pt/maps/place/Altice+Forum+Braga/@41.5414507,-8.4246834,17z/data=!3m1!4b1!4m5!3m4!1s0xd24fc6519e03b3d:0xb47f5e1a7515bd95!8m2!3d41.5414467!4d-8.4224894"
            className="SchedulePage-room"
          >
            Altice Forum Braga <br /> Main Room
          </a>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">09:00</p>
          <p className="SchedulePage-entryTitle">Check in</p>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">09:50</p>
          <p className="SchedulePage-entryTitle">Opening</p>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">10:00</p>
          <a
            href="/speakers#vitaly-friedman"
            className="SchedulePage-entryTitle"
          >
            TBA{' '}
            <span className="SchedulePage-entrySpeaker">
              by Vitaly Friedman
            </span>
          </a>
        </Row>

        <Row className="SchedulePage-entry xl">
          <p className="SchedulePage-entryTime">10:45</p>
          <a href="/speakers#jackie-balzer" className="SchedulePage-entryTitle">
            Preprocessors, Components, and CSS in JS or: How I Learned to Stop
            Worrying and Love the Website{' '}
            <span className="SchedulePage-entrySpeaker">by Jackie Balzer</span>
          </a>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">11:30</p>
          <p className="SchedulePage-entryTitle">Coffe Break {Xing}</p>
          <p className="SchedulePage-entryTitle">
            Talk Shop{' '}
            <span className="SchedulePage-entrySpeaker">
              with Vitaly Friedman and Jackie Balzer
            </span>
          </p>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">12:15</p>
          <a href="/speakers#amber-case" className="SchedulePage-entryTitle">
            Designing Calm Technology{' '}
            <span className="SchedulePage-entrySpeaker">by Amber Case</span>
          </a>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">13:00</p>
          <p className="SchedulePage-entryTitle">Lunch</p>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">15:00</p>
          <a href="/speakers#aras-bilgen" className="SchedulePage-entryTitle">
            Avoiding Arctic Expeditions: Ways to do research together{' '}
            <span className="SchedulePage-entrySpeaker">by Aras Bilgen</span>
          </a>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">15:45</p>
          <p className="SchedulePage-entryTitle">
            Talk Shop{' '}
            <span className="SchedulePage-entrySpeaker">
              with Amber Case and Aras Bilgen
            </span>
          </p>
        </Row>

        <Row className="SchedulePage-entry xl">
          <p className="SchedulePage-entryTime">16:00</p>
          <a
            href="/speakers#jessica-jordan"
            className="SchedulePage-entryTitle"
          >
            Crafting Web Comics with Ember{' '}
            <span className="SchedulePage-entrySpeaker">by Jessica Jordan</span>
          </a>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">16:30</p>
          <p className="SchedulePage-entryTitle">Coffe Break {Xing}</p>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">17:15</p>
          <a href="/speakers#mike-monteiro" className="SchedulePage-entryTitle">
            How To Build an Atomic Bomb{' '}
            <span className="SchedulePage-entrySpeaker">by Mike Monteiro</span>
          </a>
        </Row>

        <Row className="SchedulePage-entry xl">
          <p className="SchedulePage-entryTime">18:00</p>
          <p className="SchedulePage-entryTitle">
            Talk Shop{' '}
            <span className="SchedulePage-entrySpeaker">
              with Jessica Jordan and Mike Monteiro
            </span>
          </p>
        </Row>

        <Row className="SchedulePage-entry">
          <p className="SchedulePage-entryTime">18:15</p>
          <p className="SchedulePage-entryTitle">Closing</p>
        </Row>
        <div className="SchedulePage-fillers" style={{ height: '70px' }} />
        <div className="SchedulePage-fillers" style={{ height: '76px' }} />
      </Column>
    </Container>
  </div>
);

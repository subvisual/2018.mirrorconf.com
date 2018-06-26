import parser from 'html-react-parser';
import React, { Component } from 'react';

import Light from '../components/Light';
import Button from '../components/Button';
import TextShadow from '../components/TextShadow';
import OverlayImage from '../components/Workshop/OverlayImage';

import '../components/Workshop/index.css';
import '../components/Workshops/index.css';

import IconDate from '../components/Workshop/icon-date.png';
import IconTicket from '../components/Workshop/icon-ticket.png';

const progress = () => 0.9;
const lightGrowProgress = () => 1;

export default class Template extends Component {
  render() {
    const { markdownRemark: post } = this.props.data;
    const { title, time, date, photo, overlay, speaker } = post.frontmatter;

    return (
      <section className="Workshops Workshops--template">
        <Light
          progress={progress}
          lightGrowProgress={lightGrowProgress}
          fixed
        />
        <div className="Workshops-wrapper">
          <div className="Workshops-list">
            <div className="Workshop">
              <div className="Workshop-column">
                <TextShadow className="Workshop-titleMobile">
                  <a className="Workshop-link is-first" href="/#workshops">
                    Go back to workshops
                  </a>
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
                  <Button
                    fullWidth
                    href="https://ti.to/subvisual/mirror-conf-2018/"
                  >
                    Buy your ticket
                  </Button>
                </div>
              </div>
              <div className="Workshop-column">
                <TextShadow>
                  <h1 className="Workshop-title">{title}</h1>
                </TextShadow>
                <p key={Date()} className="Workshop-description">
                  {parser(post.html)}
                </p>
                <a
                  className="Workshop-link"
                  href="https://ti.to/subvisual/mirror-conf-2018/"
                >
                  Buy your ticket
                </a>
                <a className="Workshop-link" href="/#workshops">
                  Go back to workshops
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export const pageQuery = graphql`
  query WorkshopByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        speaker
        date
        time
        agenda
        photo
        overlay
      }
    }
  }
`;

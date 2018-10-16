import React, { Component } from 'react';

import Hero from '../components/Hero';
import About from '../components/About';
import Speakers from '../components/Speakers';
import Workshops from '../components/Workshops';
import Schedule from '../components/Schedule';
import Location from '../components/Location';
import Sponsors from '../components/Sponsors';
import Footer from '../components/Footer';

export default class IndexPage extends Component {
  render() {
    return (
      <div className="Layout-content">
        <Hero />
        <About />
        <Speakers />
        <Workshops data={this.props.data} />
        <Schedule />
        <Location />
        <Sponsors />
        <Footer />
      </div>
    );
  }
}

export const pageQuery = graphql`
  query AllWorkshops {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: ASC }
      filter: { fileAbsolutePath: { regex: "/(workshops)/.*\\.md$/" } }
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
            speaker
            date
            time
            agenda
            photo
            overlay
            excerpt
          }
        }
      }
    }
  }
`;

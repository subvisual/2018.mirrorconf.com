import React, { Component } from 'react';

import { scrollToLocationHash } from '../utils/scroll';
import SpeakerSections from '../components/SpeakerSections';

export default class SpeakersPage extends Component {
  componentDidMount() {
    setTimeout(() => scrollToLocationHash({ offset: { y: -80 } }));
  }

  render() {
    const sections = this.props.data.allMarkdownRemark.edges;

    return <SpeakerSections sections={sections} />;
  }
}

export const pageQuery = graphql`
  query allSpeakers {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/speakers/.*/" } }
    ) {
      edges {
        node {
          html
          frontmatter {
            slug
            name
            photo
            website
            twitter
            dateTime
          }
        }
      }
    }
  }
`;

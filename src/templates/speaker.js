import parser from 'html-react-parser';
import React, { Component } from 'react';

import SpeakerPage from '../components/SpeakerPage';

export default class Template extends Component {
  render() {
    const { markdownRemark: post } = this.props.data;
    const body = parser(post.html);

    return <SpeakerPage {...post.frontmatter} body={body} />;
  }
}

export const pageQuery = graphql`
  query SpeakerByPath($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
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
`;

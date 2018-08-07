const path = require(`path`);

const QUERY = `
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            slug
          }
        }
      }
    }
  }
`;

module.exports = ({ boundActionCreators, graphql }) => {
  const Template = path.resolve(`src/templates/workshop.js`);

  return graphql(QUERY).then(result => {
    if (result.errors) {
      Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      boundActionCreators.createPage({
        path: node.frontmatter.slug,
        context: { slug: node.frontmatter.slug },
        component: Template,
      });
    });
  });
};

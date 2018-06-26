const path = require(`path`);

const QUERY = `
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
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
        path: node.frontmatter.path,
        context: { path: node.frontmatter.path },
        component: Template,
      });
    });
  });
};

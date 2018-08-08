const path = require(`path`);

const query = folder => `
{
  allMarkdownRemark(filter: { fileAbsolutePath: {regex: "/(${folder})/.*/"}}) {
    edges { node { frontmatter { slug } } }
  }
}
`;

const WORKSHOPS = {
  query: query('workshops'),
  template: 'src/templates/workshop.js',
};

const render = createPage => templatePath => result => {
  if (result.errors) {
    Promise.reject(result.errors);
  }

  const component = path.resolve(templatePath);
  const { edges } = result.data.allMarkdownRemark;

  return edges.map(({ node: { frontmatter: { slug } } }) =>
    createPage({
      component,
      path: slug,
      context: { slug },
    })
  );
};

module.exports = ({ boundActionCreators: { createPage }, graphql }) => {
  const renderFn = render(createPage);

  return Promise.all([
    graphql(WORKSHOPS.query).then(renderFn(WORKSHOPS.template)),
  ]);
};

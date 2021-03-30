const path = require('path')
const packages = require('./docs-yaml')().filter(
  ({ title }) => title === 'Packages'
)[0].items

module.exports = {
  siteMetadata: {
    siteUrl: 'https://emotion.sh',
    title: `emotion`
  },
  plugins: packages
    .map(pkg =>
      path.resolve(
        `${__dirname}/../packages/${pkg.replace('@emotion/', '')}/README.md`
      )
    )
    .map(file => ({
      resolve: 'gatsby-source-filesystem',
      options: {
        path: file
      }
    }))
    .concat([
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'docs',
          path: `${__dirname}/../docs`
        }
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: `${__dirname}/../emotion.png`
        }
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `Emotion`,
          short_name: `Emotion`,
          start_url: `/`,
          icon: `src/assets/logo.png`
        }
      },
      'gatsby-plugin-emotion-next-compat',
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: ['.mdx', '.md'],
          gatsbyRemarkPlugins: [
            {
              resolve: require.resolve(
                './plugins/gatsby-remark-remove-readme-titles'
              )
            },
            { resolve: require.resolve('./plugins/gatsby-remark-fix-links') },
            {
              resolve: require.resolve('./plugins/gatsby-remark-change-awesome')
            },
            { resolve: require.resolve('./plugins/gatsby-remark-live-code') },
            { resolve: 'gatsby-remark-autolink-headers' },
            { resolve: 'gatsby-remark-prismjs' },
            { resolve: 'gatsby-remark-smartypants' }
          ]
        }
      },
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: 'UA-101206186-1'
        }
      },
      `gatsby-plugin-react-helmet`,
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      'gatsby-plugin-catch-links',
      'gatsby-plugin-sitemap',
      'gatsby-plugin-netlify',
      'gatsby-plugin-image'
    ])
}

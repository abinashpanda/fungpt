const _ = require('lodash')

module.exports = [
  {
    type: 'confirm',
    name: 'isServerRendered',
    message: 'Is the page server rendered?',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Name of the page (use kebab-case-component-name)',
    required: true,
    /**
     * @param {string} text
     */
    validate: (text) => {
      if (_.kebabCase(text) !== text) {
        return 'Name must be kebab-case'
      }
      return true
    },
  },
]

const _ = require('lodash')

module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Name of the hook (use kebab-case-hook-name). Do not include the "use" prefix.',
    required: true,
    /**
     * @param {string} text
     */
    validate: (text) => {
      if (_.kebabCase(text) !== text) {
        return 'Name must be kebab-case'
      }
      if (text.startsWith('use')) {
        return 'Do not include the "use" prefix.'
      }
      return true
    },
  },
]

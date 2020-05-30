/* eslint-disable valid-jsdoc */
/* eslint-disable linebreak-style */
const mjmlLib = require('mjml');
const stampit = require('stampit');
const fetch = require('node-fetch');
const handlebars = require('handlebars');
require('handlebars-helpers')({ handlebars });

/**
 * Fetch the template file from a URL
 * @param {string} url
 * @return {Promise<string>}
 */
function getTemplateFile(url) {
  return fetch(url).then(res => res.text()).then(res => res);
}

const Email = stampit({
  props: {
    config: undefined,
    feeds: undefined,
    mjmlContent: undefined,
    mdContent: undefined,
    txtContent: undefined,
  },

  /**
   * Instantiate a new email object
   * @param {{object, array}} config, feeds
   * @return {void}
   */
  init({ config, feeds }) {
    this.config = config;
    this.feeds = feeds;
  },

  methods: {
    /**
     * Generate mjmlContent from the config and feeds set in the constructor
     * @returns {Email}
     */
    async generate(templateURL) {

      const source = await getTemplateFile(templateURL || this.config.MJMLtemplateUrl);
      const template = handlebars.compile(source);

      return template({ ...this.config, feeds: this.feeds });

    },

    /**
     * Get the MJML email as a string.
     * @return {string}
     */
    async getMjml() {
      this.mjmlContent = await this.generate();

      return this.mjmlContent;
    },

    /**
     * Get the HTML email as a string.
     * @return {string}
     */
    async getMd() {

      this.mdContent = this.generate(this.config.MDtemplateUrl);

      return this.mdContent;
    },

      /**
     * Get the HTML email as a string.
     * @return {string}
     */
    async getTxt() {

      this.txtContent = await this.generate(this.config.TXTtemplateUrl);

      return this.txtContent;
    },

    /**
     * Get the HTML email as a string.
     * @return {string}
     */
    async getHtml() {
      return mjmlLib(await this.getMjml()).html;
    },
  },
});


module.exports = Email;

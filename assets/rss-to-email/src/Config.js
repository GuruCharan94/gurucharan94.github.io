/* eslint-disable linebreak-style */
const stampit = require('stampit');

const DEFAULT_CONFIG_WARNING_MESSAGE = 'No configuration object included.';
const DEFAULT_MJML_TEMPLATE_URL = 'https://raw.githubusercontent.com/gurucharan94/rss-to-email/master/src/templates/newsletter.mjml';
const DEFAULT_MD_TEMPLATE_URL = 'https://raw.githubusercontent.com/gurucharan94/rss-to-email/master/src/templates/newsletter.md';
const DEFAULT_TXT_TEMPLATE_URL = 'https://raw.githubusercontent.com/gurucharan94/rss-to-email/master/src/templates/newsletter.txt';

const HeaderConfig = stampit({
  props: {
    title: undefined,
    issueNumber: undefined,
    dateOfIssue: undefined,
  },
  /**
  * Initialize
  * @param {object} options
  * @return {void}
  */
  init(options) {
    this.title = options.title;
    this.issueNumber = options.issueNumber;
    this.dateOfIssue = options.dateOfIssue;
  },
});

const FeedConfig = stampit({
  props: {
    title: undefined,
    url: undefined,
  },
  /**
  * Initialize
  * @param {object} options
  * @return {void}
  */
  init(options) {
    this.title = options.title;
    this.url = options.url;
  },
});

const DEFAULT_CONFIG_OBJECT = {
  accentColor: 'red',
  filename: 'output',
  MJMLtemplateUrl: DEFAULT_MJML_TEMPLATE_URL,
  MDtemplateUrl: DEFAULT_MD_TEMPLATE_URL,
  TXTtemplateUrl: DEFAULT_TXT_TEMPLATE_URL,
  header: HeaderConfig({
    description: '',
    title: 'title',
    url: 'http://www.feedforall.com/sample.xml',
  }),
  feeds: [FeedConfig({
    publishedSince: undefined,
    title: 'A custom feed title',
    url: 'http://www.feedforall.com/sample.xml',
    dataFile: './data/others.json',
  })],
  newsletterBrowserLink: 'www.gurucharan.in/newsletter/0',
  newsletterUnsubscribeLink: 'www.gurucharan.in/newsletter',
  newsletterArchivesLink: 'www.gurucharan.in/newsletter',
  sponsorName: 'Sponsor Name',
  sponsorLink: 'www.gurucharan.in',
  sponsorMessage: 'Company is the only one that agreed to pay us some money. So we tell you what they do. You already might know them, but whatever. Shut up and read. Also here is an extended free trial of their product',
  twitterShareLink: ''
};

/**
* Determine whether or not a value is null or undefined
* @param {any} val
* @return {boolean}
*/
function isNullOrUndefined(val) {
  return val === undefined || val === null;
}

const Config = stampit({
  props: DEFAULT_CONFIG_OBJECT,
  /**
  * Initialize
  * @param {object} options
  * @return {void}
  */
  init(options) {
    if (Object.keys(options).length === 0 && options.constructor === Object) {
      throw DEFAULT_CONFIG_WARNING_MESSAGE;
    }

    Object.keys(this).forEach((property) => {
      this[property] = !isNullOrUndefined(options[property])
        ? options[property]
        : DEFAULT_CONFIG_OBJECT[property];
    });
  },
});

module.exports = Config;

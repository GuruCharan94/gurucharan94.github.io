#!/usr/bin/env node
/* eslint-disable linebreak-style */
const fs = require('fs');
const RssToEmail = require('./src/RssToEmail');

/**
 * Run the RSS to Email script
 * @param config
 * @return {Promise<object>}
 */
async function init(config) {
  const rssToEmail = RssToEmail(config);
  // Get files
  const html = await rssToEmail.getEmail();
  const mjml = await rssToEmail.getEmail('mjml');
  const md = await rssToEmail.getEmail('md');
  const txt = await rssToEmail.getEmail('txt');


  return { html, mjml, md, txt };
}

const [,, ...args] = process.argv;

if (args[0] && args[1]) {
  // Get config object from file path
  const config = JSON.parse(fs.readFileSync(args[0], 'utf8'));

  // Run the script
  init(config).then((results) => {
    fs.writeFileSync(`${args[1]}/${config.filename}-${new Date().toDateString()}.html`, results.html);
    fs.writeFileSync(`${args[1]}/${config.filename}-${new Date().toDateString()}.mjml`, results.mjml);
    fs.writeFileSync(`${args[1]}/${config.filename}-${new Date().toDateString()}.md`, results.md);
    fs.writeFileSync(`${args[1]}/${config.filename}-${new Date().toDateString()}.txt`, results.txt);

  });
} else {
  console.error('Error: config file and output directory should be specified.');
}

/**
  Your global data folder is controlled by the dir.data configuration option. 
  All *.json and module.exports values from *.js files in this directory will 
  be added into a global data object available to all templates.

  This file can be accessed using: {{ site.title }}
*/

module.exports = {
  title: 'Eli Nathan | Web design and development | Glasgow',
  description: 'I am a freelance web designer and developer based here in Glasgow. Have a look at my portfolio and get in touch!',
  ENV: process.env.ELEVENTY_ENV,
  baseurl: ''
};

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  // Remove apostrophes
  eleventyConfig.addFilter("removeApostrophe", function(str) {
    return str.replace("'", "");
  });

  // Ordinal date filter
  eleventyConfig.addFilter("ordinal", function(date) {
    return date + (date > 0 ? ['th', 'st', 'nd', 'rd'][(date > 3 && date < 21) || date % 10 > 3 ? 0 : date % 10] : '');
  });

  return {
    dir: {
      input: "src/",
      output: "docs",
      includes: "_includes"
    },
    templateFormats: ["html", "md", "liquid"],
    htmlTemplateEngine: "liquid",

    // 1.1 Enable elventy to pass dirs specified above
    // passthroughFileCopy: true
  };
};

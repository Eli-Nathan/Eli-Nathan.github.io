const htmlmin = require("html-minifier");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const {format} = require('date-fns/format')

function eleventyConfig(config) {
	// Passthroughs
	config.addPassthroughCopy("src/assets/**/*");
	config.addPassthroughCopy("src/robots.txt");

	// Layout aliases
	config.addLayoutAlias("base", "layouts/default.html");
	config.addPlugin(syntaxHighlight);

	// Remove apostrophes
	config.addFilter("removeApostrophe", function (str) {
		return str.replace("'", "");
	});

	// Ordinal date
	config.addFilter("ordinal", function (date) {
		let newDate =
			date +
			(date > 0
				? ["th", "st", "nd", "rd"][
						(date > 3 && date < 21) || date % 10 > 3 ? 0 : date % 10
				  ]
				: "");
		return newDate.replace(/^0+/, "");
	});

	// Minify HTML
	const isProduction = process.env.ELEVENTY_ENV === "production";

	var htmlMinify = function (value, outputPath) {
		if (outputPath && outputPath.indexOf(".html") > -1) {
			return htmlmin.minify(value, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
				minifyCSS: true,
			});
		}
	};

	// html min only in production
	if (isProduction) {
		config.addTransform("htmlmin", htmlMinify);
	}

	// Configuration
	return {
		dir: {
			input: "src",
			output: "docs",
			includes: "_includes",
			data: "_data",
		},
		templateFormats: ["html", "md", "liquid", "njk"],
		htmlTemplateEngine: "liquid",
		markdownTemplateEngine: "liquid",
	};
}

module.exports = eleventyConfig;

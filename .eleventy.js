const { resolve } = require('path');
const fs = require('fs');

const beautify = require('js-beautify');
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('src/')
	eleventyConfig.addPassthroughCopy('src/assets/')

	eleventyConfig.on('eleventy.before', async ({ dir, runMode, outputMode }) => {
		const outputPath = dir.output;

		if(fs.existsSync(outputPath)) {
      fs.rmSync(outputPath, { recursive: true, force: true });
			console.log(`Deleted ${outputPath}`);
    }

  });

	eleventyConfig.addTransform("htmlmin", function(content) {
    if( this.page.outputPath && this.page.outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });
	
	eleventyConfig.addTransform("beautify", function(content) {
		if( this.page.outputPath && this.page.outputPath.endsWith(".html") ) {
			let formated = beautify.html(content, {
				indent_size: 2,
  			wrap_line_length: 0,
				wrapAttributes: "auto",
				unformattedContentDelimiter: ["pre", "code"],
				unformatted: null,
				contentUnformatted: ["pre", "code"],
			});
			return formated;
		}

		return content;
	});

	return {
		templateFormats: ['njk', 'html'],
		htmlTemplateEngine: 'njk',
		passthroughFileCopy: true,
		dir: {
			input: 'src',
			output: 'build',
			includes: '_includes',
			layouts: '_layouts',
		}
	}
}

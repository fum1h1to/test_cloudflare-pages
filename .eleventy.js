const path = require('path');
const fs = require('fs');

const beautify = require('js-beautify');
const htmlmin = require("html-minifier");

require('dotenv').config()

const copyDir2root = function(srcDirName) {
	try {
    const files = fs.readdirSync(path.join(__dirname, srcDirName));

    for (const file of files) {
      const sourcePath = path.join(__dirname, srcDirName, file);
      const destPath = path.join(__dirname, file);

      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied ${file} to project root`);
    }

    console.log('All files copied successfully');
  } catch (error) {
    console.error('Error copying files:', error);
  }
}

module.exports = function (eleventyConfig) {
	const productMode = process.env.PRODUCT_MODE;
	console.log(productMode);
	if (productMode === "preview") {
		copyDir2root('cloudflare-config');
	}

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

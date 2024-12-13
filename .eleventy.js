const { resolve } = require('path');
const fs = require('fs');

const beautify = require('js-beautify');
const htmlmin = require("html-minifier");
const crypto = require('crypto');
const { DateTime } = require('luxon');

function createHash(text) {
	const uint8 = new TextEncoder().encode(text)
	return crypto.createHash('md5').update(uint8).digest('hex');
}

module.exports = function (eleventyConfig) {
	eleventyConfig.addWatchTarget('src/')
	eleventyConfig.addPassthroughCopy('src/assets/')

	eleventyConfig.on('eleventy.before', async ({ dir, runMode, outputMode }) => {
		const outputPath = dir.output;

		if (fs.existsSync(outputPath)) {
			fs.rmSync(outputPath, { recursive: true, force: true });
			console.log(`Deleted ${outputPath}`);
		}

	});

	eleventyConfig.addFilter("dateToFormat", function (date, format) {
		return DateTime.fromISO(date).toFormat(format);
	});

	eleventyConfig.addFilter("dateToISO", function (date) {
		return DateTime.fromISO(date).toISO();
	});

	eleventyConfig.addFilter("slug", function (str) {
		return createHash(str);
	});

	eleventyConfig.addCollection("posts", function (collectionApi) {
		const posts = collectionApi.getAll()[0].data.posts;
    
		posts.sort((a, b) => new Date(b.date) - new Date(a.date));

		return posts.map((post, index) => ({
			...post,
			url: post.url == null ? `/posts/${eleventyConfig.getFilter("slug")(post.title + post.date)}/` : post.url,
			slug: eleventyConfig.getFilter("slug")(post.title + post.date),
			prevPost: posts[index - 1] || null,
			nextPost: posts[index + 1] || null
		}));
	});

	eleventyConfig.addCollection("recentPosts", function (collectionApi) {
		const posts = collectionApi.getAll()[0].data.posts;
    
		posts.sort((a, b) => new Date(b.date) - new Date(a.date));

		return posts.slice(0, 5).map((post) => ({
			...post,
			url: post.url == null ? `/posts/${eleventyConfig.getFilter("slug")(post.title + post.date)}/` : post.url,
			slug: eleventyConfig.getFilter("slug")(post.title + post.date),
		}));
	});

	eleventyConfig.addTransform("htmlmin", function (content) {
		if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				removeComments: true,
				collapseWhitespace: true
			});
			return minified;
		}

		return content;
	});

	eleventyConfig.addTransform("beautify", function (content) {
		if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
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

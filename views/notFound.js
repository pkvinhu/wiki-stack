const html = require("html-template-tag");
const layout = require("./layout");

module.exports = { notFound: () => layout('NOT FOUND'),
				   serverError: (error) => layout(error.toString())
				   }
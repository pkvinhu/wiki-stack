const addPage = require("./addPage");
const editPage = require("./editPage");
const main = require("./main");
const userList = require("./userList");
const userPages = require("./userPages");
const wikiPage = require("./wikiPage");
const { notFound, serverError } = require('./notFound');

module.exports = { addPage, editPage, main, userList, userPages, wikiPage, notFound };

'use strict';
/* eslint-disable no-unused-vars */

/**
 * Formatters module
 * @module sockbot.providers.example.Format
 * @author Accalia
 * @license MIT
 */

/**
 * Generate a permalink for a post
 *
 * @param {!number} postId Id or the post to url
 * @returns {string} Absolute URL for post
 */
exports.urlForPost = function postLink(postId) {
    return ''; // Optional
};

/**
 * Generate a link for a topic
 *
 * @param {!number} topicId Id of the topic to url
 * @param {string} [topicSlug] Slug of the topic to url
 * @param {number} [postIndex] Index of the post to url to in topic
 * @returns {string} Absolute URL for topic
 */
exports.urlForTopic = function linkTopic(topicId, topicSlug, postIndex) {
    return ''; // Optional
};

/**
 * Turn input text into a forum quote
 *
 * @param {!string} text Text to quote
 * @param {string} [quotedUser] User who said the quote
 * @param {string} [contextUrl] Url to the quoted post
 * @param {string} [contextTitle] Title of the quote context link
 * @returns {string} quoted text, with attribution if username provided
 */
exports.quoteText = function quoteText(text, quotedUser, contextUrl, contextTitle) {
    return text; // Optional
};

/**
 * Generate a hyperlink
 *
 * @param {!string} url URL to link to
 * @param {string} linkText Link Text to display
 * @returns {string} Linkified url
 */
exports.link = function link(url, linkText) {
    return `${linkText} (${url})`;
};

/**
 * Generate an image
 *
 * @param {!string} url Image URL
 * @param {string} titleText Title text to display
 * @returns {string} Image incantation
 */
exports.image = function image(url, titleText) {
    return `${titleText} (${url})`;
};

/**
 * Spoiler something
 *
 * @param {!string} body Spoiler body
 * @param {string} title spoiler title to display
 * @returns {string} spoilered text
 */
exports.spoiler = function spoiler(body, title) {
    return body;
};

/**
 * Format text as bold.
 *
 * @param {!string} text Input text
 * @returns {string} Bolded Text
 */

exports.bold = function bold(text) {
    return text;
};

/**
 * Format text as italic.
 *
 * @param {!string} text Input text
 * @returns {string} Italiced Text
 */

exports.italic = function italic(text) {
    return text;
};

/**
 * Format text as bold italic.
 *
 * @param {!string} text Input text
 * @returns {string} Bolded and italiced Text
 */

exports.bolditalic = function bolditalic(text) {
    return text;
};

/**
 * Format text as a first level header.
 *
 * @param {!string} text Header text
 * @returns {string} Headered Text
 */

exports.header1 = function header1(text) {
    return text;
};

/**
 * Format text as a second level header.
 *
 * @param {!string} text Header text
 * @returns {string} Headered Text
 */

exports.header2 = function header2(text) {
    return text;
};

/**
 * Format text as a third level header.
 *
 * @param {!string} text Header text
 * @returns {string} Headered Text
 */

exports.header3 = function header3(text) {
    return text;
};

/**
 * Format text as a fourth level header.
 *
 * @param {!string} text Header text
 * @returns {string} Headered Text
 */

exports.header4 = function header4(text) {
    return text;
};

/**
 * Format text as a fifth level header.
 *
 * @param {!string} text Header text
 * @returns {string} Headered Text
 */

exports.header5 = function header5(text) {
    return text;
};

/**
 * Format text as a sixth level header.
 *
 * @param {!string} text Header text
 * @returns {string} Headered Text
 */

exports.header6 = function header6(text) {
    return text;
};

/**
* Format text as a preformatted block
*
* @param {!string} text The text
* @returns {string} Text in a preformat block
*/
exports.preformat = function preformat (text) {
    return text;
};
  
/**
 * Format text with a strikethrough effect
 *
 * @param {!string} text The text to strike out
 * @returns {string} The stricken text
 */
exports.strikethrough = function strikethrough (text) {
    return text;
};

/**
 * Format text as a list of items
 *
 * @param {!Array} items An array of strings to format as a list
 * @returns {string} The list
 */
exports.list = function list (items) {
    return items;
};

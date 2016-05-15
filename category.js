'use strict';
/**
 * Example provider module Category class
 * @module sockbot.providers.example.Category
 * @author Accalia
 * @license MIT
 */

/**
 * Create a Category class and bind it to a forum instance
 *
 * @param {Provider} forum A forum instance to bind to constructed Category class
 * @returns {Category} A Category class bound to the provided `forum` instance
 */
exports.bindCategory = function bindCategory(forum) {
    /**
     * Topic Processor
     *
     * @typedef {TopicProcessor}
     * @function
     *
     * @param {Topic} topic Topic to process
     * @param {User} user Topic Opening User
     * @param {Category} category The category `topic` belongs to
     * @returns {Promise} Resolves on completion
     */

    /**
     * Category Class
     *
     * Represents a forum category.
     *
     * @public
     *
     */
    class Category {
        /**
         * Construct a category object from a provided payload.
         *
         * This constructor is intended for private use only, if you need top construct a category from payload data use
         * `Category.parse()` instead.
         *
         * @public
         * @class
         *
         * @param {*} payload Payload to construct the Category object out of
         */
        constructor(payload) {
            
        }

        /**
         * Category Id
         *
         * @public
         *
         * @type {number}
         */
        get id() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Category Name
         *
         * @public
         *
         * @type {string}
         */
        get name() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Category description
         *
         * @public
         *
         * @type {string}
         */
        get description() {
            return ''; //optional
        }

        /**
         * Parent Category Id
         *
         * @public
         *
         * @type {number}
         */
        get parentId() {
            //required. may be null or undefined for top level category
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Number of topics in this category
         *
         * @public
         *
         * @type {number}
         */
        get topicCount() {
            return undefined; // Optional
        }

        /**
         * Number of posts in this category
         *
         * @public
         *
         * @type {number}
         */
        get postCount() {
            return undefined; // Optional
        }

        /**
         * Number of "recent" posts in this category
         *
         * @public
         *
         * @type {number}
         */
        get recentPosts() {
            return undefined; // Optional
        }

        /**
         * The web URL of the category
         *
         * @public
         *
         * @returns {Promise<string>} Resolves to the web URL         *
         */
        url() {
            return Promise.resolve(); // Optional
        }

        /**
         * Get all Topics in the category
         *
         * @public
         *
         * @param {TopicProcessor} eachTopic A function to process each topic
         * @returns {Promise} Resolves when all topics have been processed
         */
        getAllTopics(eachTopic) {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Get all recently active Topics in the category
         *
         * @public
         *
         * @param {TopicProcessor} eachTopic A function to process each topic
         * @returns {Promise} Resolves when all topics have been processed
         */
        getRecentTopics(eachTopic) {
            return Promise.resolve(); // Optional
        }

        /**
         * Watch this category for new activity
         *
         * @public
         *
         * @returns {Promise<Category>} Resolves to self on completion
         */
        watch() {
            return Promise.resolve(this); //Optional
        }

        /**
         * Stop watching this category for new activity
         *
         * @public
         *
         * @returns {Promise<Category>} Resolves to self on completion
         */
        unwatch() {
            return Promise.resolve(this); // Optional
        }

        /**
         * Prevent this category from generating any notifications
         *
         * This is not currently supported by NodeBB and is a noop
         *
         * @public
         *
         * @returns {Promise<Category>} Resolves to self on completion
         */
        mute() {
            return Promise.resolve(this); // Optional
        }

        /**
         * Allow this category to generate notifications
         *
         * This is not currently supported by NodeBB and is a noop
         *
         * @public
         *
         * @returns {Promise<Category>} Resolves to self on completion
         */
        unmute() {
            return Promise.resolve(this);
        }

        /**
         * retrieve a category by Id
         *
         * @public
         *
         * @param {number} categoryId Id of the category to retrieve
         * @returns {Promise<Category>} Resolves to retrieved category
         */
        static get(categoryId) {
            return Category.parse('');
        }

        /**
         * Parse a category from payload data
         *
         * @public
         *
         * @param {*} payload Data to parse as category
         * @returns {Category} Parsed category
         *
         */
        static parse(payload) {
            return new Category(payload);
        }
    }
    return Category;
};

'use strict';
/* eslint-disable */
/**
 * Example provider module Topic class
 * @module sockbot.providers.example.Topic
 * @author Accalia
 * @license MIT
 */

/**
 * Create a Topic class and bind it to a forum instance
 *
 * @param {Provider} forum A forum instance to bind to constructed Topic class
 * @returns {User} A Topic class bound to the provided `forum` instance
 */
exports.bindTopic = function bindTopic(forum) {
    /**
     * Topic Class
     *
     * Represends a forum topic
     *
     * @public
     *
     */
    class Topic {
        /**
         * Construct a topic object from a provided payload.
         *
         * This constructor is intended for private use only, if you need top construct a topic from payload data use
         * `Topic.parse()` instead.
         *
         * @public
         * @class
         *
         * @param {*} payload Payload to construct the User object out of
         */
        constructor(payload) {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Forum specific ID for topic author
         *
         * @public
         *
         * @type {!number}
         */
        get authorId() {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Topic title
         *
         * @public
         *
         * @type {!string}
         */
        get title() {
            throw new Error('E_NOT_IMPLEMENTED');
        }

        /**
         * DateTime that the topic was created
         *
         * @public
         *
         * @type {!Date}
         */
        get posted() {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * DateTime that the topic was last replied to
         *
         * @public
         *
         * @type {!Date}
         */
        get lastPosted() {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Forum Specific Topic Id
         *
         * @public
         *
         * @type {!number}
         */
        get id() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Forum id of the opening post
         *
         * @public
         *
         * @type {!number}
         */
        get mainPostId() {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Count of posts in topic
         *
         * @public
         *
         * @type {number}
         */
        get postCount() {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Retrieve the web URL for the topic
         *
         * @public
         *
         * @returns {Promise<string>} Resolves to the web URL for this topic
         *
         * @promise
         * @fulfill {string} The Web URL for this topic
         * @reject {Error} An Error that occured while retrieving the post URL
         */
        url() {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Reply to this topic with the given content
         *
         * @public
         *
         * @param {string} content Post Content
         * @returns {Promise<Post>} Resolves to the newly created Post
         *
         * @promise
         * @fulfill {Post} The newly created Post
         * @reject {Error} An Error that occured while posting
         */
        reply(content) {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Proccess Post
         *
         * @typedef {PostProcessor}
         * @function
         *
         * @param {Post} post Post to process
         * @param {User} user User who posted `post`
         * @param {Topic} topic Topic `post` is posted to
         * @returns {Promise} A promise that fulfills when processing is complete
         */

        /**
         * Retrieve all posts from this topic, passing each off to a provided iterator function.
         *
         * @public
         *
         * @param {PostProcessor} eachPost A function to process retrieved posts.
         * @returns {Promise<Topic>} Resolves to self on completion
         *
         * @promise
         * @fulfill {Topic} Source Topic
         * @reject {Error} An Error that occured while posting
         */
        getAllPosts(eachPost) {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Retrieve most posts from this topic, passing each off to a provided iterator function.
         *
         * @public
         *
         * @param {PostProcessor} eachPost A function to process retrieved posts.
         * @returns {Promise<Topic>} Resolves to self on completion
         *
         * @promise
         * @fulfill {Topic} Source Topic
         * @reject {Error} An Error that occured while posting
         */
        getLatestPosts(eachPost) {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Mark the topic read up to a point
         *
         * @public
         *
         * @param {number} [postNumber] Last read post. Omit to mark the entire topic read
         * @returns {Promise<Topic>} Resolves to self on completion
         *
         * @promise
         * @fulfill {Topic} Source Topic
         * @reject {Error} An Error that occured while posting
         */
        markRead(postNumber) {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Watch the topic for new replies
         *
         * @public
         *
         * @returns {Promise<Topic>} Resolves to self on completion
         *
         * @promise
         * @fulfill {Topic} Source Topic
         * @reject {Error} An Error that occured while posting
         */
        watch() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Stop watching the tipic for new replies
         *
         * @public
         *
         * @returns {Promise<Topic>} Resolves to self on completion
         *
         * @promise
         * @fulfill {Topic} Source Topic
         * @reject {Error} An Error that occured while posting
         */
        unwatch() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Mute the topic to suppress notifications
         *
         * @public
         *
         * @returns {Promise<Topic>} Resolves to self on completion
         *
         * @promise
         * @fulfill {Topic} Source Topic
         * @reject {Error} An Error that occured while posting
         */
        mute() {
            return this.unwatch();
        }

        /**
         * Unmute the topic, allowing notifications to be generated again.
         *
         * @public
         *
         * @returns {Promise<Topic>} Resolves to self on completion
         *
         * @promise
         * @fulfill {Topic} Source Topic
         * @reject {Error} An Error that occured while posting
         */
        unmute() {
            return this.watch();
        }

        /**
         * Retrieve a topic by topic id
         *
         * @static
         * @public
         *
         * @param {!number} topicId Id of topic to retrieve
         * @returns {Promise<Topic>} Retrieved topic
         *
         * @promise
         * @fulfill {Topic} Retrieved Topic
         * @reject {Error} An Error that occured while posting
         */
        static get(topicId) {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Parse a topic from retrieved data
         *
         * @public
         *
         * @param {*} payload Payload to parse into a topic
         * @returns {Topic} Parsed topic
         */
        static parse(payload) {
            return new Topic(payload);
        }

        /**
         * Get All Unread Topics
         *
         * @public
         *
         * @param {TopicProcessor} eachTopic A function to process each retrieved topic
         * @returns {Promise} A promise that resolves when all topics have been processed
         */
        static getUnreadTopics(eachTopic) {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Get All Topics in order of most recent activity
         *
         * @public
         *
         * @param {TopicProcessor} eachTopic A function to process each retrieved topic
         * @returns {Promise} A promise that resolves when all topics have been processed
         */
        static getRecentTopics(eachTopic) {
            throw new Error('E_UNSUPPORTED');
        }
    }
    return Topic;
};

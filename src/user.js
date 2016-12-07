'use strict';
/**
 * Example provider module User class
 * @module sockbot.providers.example.User
 * @author Accalia
 * @license MIT
 */

/**
 * Create a User class and bind it to a forum instance
 *
 * @param {Provider} forum A forum instance to bind to constructed User class
 * @returns {User} A User class bound to the provided `forum` instance
 */
exports.bindUser = function bindUser(forum) {
    /**
     * User Class
     *
     * Represents a forum user
     *
     * @public
     */
    class User {
        /**
         * Construct a User object from payload
         *
         * This constructor is intended to be private use only, if you need to construct a user from payload data use
         * `User.parse()` instead
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
         * Forum Specific User Id
         *
         * @public
         *
         * @type {!number}
         */
        get id() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Descriptive name of the User
         *
         * @public
         *
         * @type {?string}
         */
        get name() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Username of the User
         *
         * @public
         *
         * @type {!string}
         */
        get username() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Email address of the User
         *
         * May be blank if active login does not have sufficient rights to read email address
         *
         * @public
         *
         * @type {?string}
         */
        get email() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Link to avatar image for user
         *
         * @public
         *
         * @type {!string}
         */
        get avatar() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Number of posts User has made at time of retrieval
         *
         * @public
         *
         * @type {!number}
         */
        get postCount() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Number of topics User has created at time of retrieval
         *
         * @public
         *
         * @type {!number}
         */
        get topicCount() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * User reputation at time of retrieval
         *
         * @public
         *
         * @type {!number}
         */
        get reputation() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Datetime User last made a publically visible post
         *
         * @public
         *
         * @type {!Date}
         */
        get lastPosted() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Datetime User was last seen online
         *
         * @public
         *
         * @type {!Date}
         */
        get lastSeen() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Url to User profile
         *
         * @public
         *
         * @returns {Promise<string>} A promise that resolves to the desired URL
         *
         * @promise
         * @fulfill {string} The desired Url
         * @reject {Error} An Error that occured while determining URL
         */
        url() {
            return Promise.resolve('');
        }

        /**
         * Follow the User
         *
         * @public
         *
         * @returns {Promise<User>} Resolves on completion to followed User
         *
         * @promise
         * @fulfill {User} The followed User
         * @reject {Error} An Error that occured while processing
         */
        follow() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Unfollow the User
         *
         * @public
         *
         * @returns {Promise<user>} Resolves to the unfollowed User
         *
         * @promise
         * @fulfill {User} The unfollowed User
         * @reject {Error} An Error that occured while processing
         */
        unfollow() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Get User by Id
         *
         * @static
         * @public
         *
         * @param {!number} userId ID of the user to retrieve
         * @returns {Promise<User>} Resolves to the retrieved User
         *
         * @promise
         * @fulfill {User} The retrieved User
         * @reject {Error} An Error that occured while processing
         *
         */
        static get(userId) {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Get User by username
         *
         * @static
         * @public
         *
         * @param {!string} username Username of the user to retrieve
         * @returns {Promise<User>} Resolves to the retrieved User
         *
         * @promise
         * @fulfill {User} The retrieved User
         * @reject {Error} An Error that occured while processing
         *
         */
        static getByName(username) {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Parse user from retrieved payload
         *
         * @static
         * @public
         *
         * @param {!*} payload Data to parse as a User object
         * @returns {Promise<User>} Resolves to the parsed User
         *
         * @promise
         * @fulfill {User} The parsed User
         * @reject {Error} An Error that occured while processing
         *
         */
        static parse(payload) {
            return new User(payload);
        }
    }
    return User;
};

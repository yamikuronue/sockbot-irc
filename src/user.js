'use strict';
/**
 * Example provider module User class
 * @module sockbot.providers.example.User
 * @author yamikuronue
 * @license MIT
 */
 
const debug = require('debug')('sockbot:providers:irc:user');

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
            this.data = {};
            this.data.nick = payload.nick;
            this.data.host = payload.host;
            this.data.realname = payload.realname;
        }

        /**
         * Forum Specific User Id
         *
         * @public
         *
         * @type {!number}
         */
        get id() {
            return `${this.data.nick}@${this.data.host}`;
        }

        /**
         * Descriptive name of the User
         *
         * @public
         *
         * @type {?string}
         */
        get name() {
            return this.data.realname;
        }

        /**
         * Username of the User
         *
         * @public
         *
         * @type {!string}
         */
        get username() {
            return this.data.nick;
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
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Link to avatar image for user
         *
         * @public
         *
         * @type {!string}
         */
        get avatar() {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Number of posts User has made at time of retrieval
         *
         * @public
         *
         * @type {!number}
         */
        get postCount() {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Number of topics User has created at time of retrieval
         *
         * @public
         *
         * @type {!number}
         */
        get topicCount() {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * User reputation at time of retrieval
         *
         * @public
         *
         * @type {!number}
         */
        get reputation() {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Datetime User last made a publically visible post
         *
         * @public
         *
         * @type {!Date}
         */
        get lastPosted() {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Datetime User was last seen online
         *
         * @public
         *
         * @type {!Date}
         */
        get lastSeen() {
            throw new Error('E_UNSUPPORTED');
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
         *
         * @promise
         * @fulfill {User} The followed User
         * @reject {Error} An Error that occured while processing
         */
        follow() {
            throw new Error('E_UNSUPPORTED');
        }

        /**
         * Unfollow the User
         *
         * @public
         *
         *
         * @promise
         * @fulfill {User} The unfollowed User
         * @reject {Error} An Error that occured while processing
         */
        unfollow() {
            throw new Error('E_UNSUPPORTED');
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
            debug(`Attempting to get user ${userId}`);
            if (userId.indexOf('@') > 0) {
                userId = userId.split('@')[0];
            }
            return new Promise((resolve) => {
                forum.client.whois(userId, (info) => {
                    resolve(User.parse(info));
                });
            });
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
            return User.get(username);
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

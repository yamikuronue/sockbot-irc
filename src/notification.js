'use strict';
/**
 * Example provider module Notification class
 * @module sockbot.providers.example.Notification
 * @author yamikuronue
 * @license MIT
 */
 
const debug = require('debug')('sockbot:providers:irc:notifications');

/**
 * Create a Notification class and bind it to a forum instance
 *
 * @param {Provider} forum A forum instance to bind to constructed Notification class
 * @returns {Notification} A Notification class bound to the provided `forum` instance
 */
exports.bindNotification = function bindNotification(forum) {
    /**
     * Notification Class
     *
     * Represents a forum notification
     *
     * @public
     */
    class Notification {
        /**
         * Construct a Notification object from payload
         *
         * This constructor is intended to be private use only, if you need to construct a notification from payload
         * data use `Notification.parse()` instead
         *
         * @public
         * @class
         *
         * @param {*} payload Payload to construct the Notification object out of
         */
        constructor(payload) {
            this.data = {};
            this.data.nick = payload.nick;
            this.data.to = payload.to;
            this.data.text = payload.text;
            this.data.raw = payload.message;
            this.data.type = payload.type;
            this.data.ts = new Date();
        }

        /**
         * Unique notification id of this notification
         *
         * @public
         *
         * @type {string}
         */
        get id() {
            return 0;
        }

        /**
         * Post id this notification refers to
         *
         * @public
         *
         * @type {number}
         */
        get postId() {
            return 0;
        }

        /**
         * Topic id this post refers to
         *
         * @public
         *
         * @type {number}
         */
        get topicId() {
            return this.data.to;
        }

        /**
         * User id that generated this notification
         *
         * @public
         *
         * @type {number}
         */
        get userId() {
            return this.data.nick;
        }

        /**
         * Notification type code
         *
         * @public
         *
         * @type {notificationType}
         */
        get type() {
            return this.data.type;
        }

        /**
         * Notification subtype
         *
         * @public
         *
         * @type {string}
         */
        get subtype() {
            return this.data.type;
        }

        /**
         * Is this notification read yet?
         *
         * @public
         *
         * @type {boolean}
         */
        get read() {
            return false;
        }

        /**
         * Datetime this notification was generated on
         *
         * @public
         *
         * @type {Date}
         */
        get date() {
            return this.data.ts;
        }

        /**
         * Notification label
         *
         * @public
         *
         * @type {string}
         */
        get label() {
            return `new message from ${this.data.nick} in ${this.data.to}`;
        }

        /**
         * Content of notification.
         *
         * @public
         *
         * @type {string}
         */
        get body() {
            return this.data.text;
        }

        /**
         * Raw Markup for this notification body
         *
         * @public
         *
         * @returns {Promise<string>} Resolves to the notification markup
         *
         * @promise
         * @fulfill the Notification markup
         */
        getText() {
            return Promise.resolve(this.data.text);
        }

        /**
         * URL Link for the notification if available
         *
         * @public
         *
         * @returns {Promise<string>} Resolves to the URL for the post the notification is for
         *
         * @promise
         * @fullfil {string} The URL for the post the notification is for
         */
        url() {
            return Promise.resolve('');
        }

        /**
         * Get the post this Notification refers to
         *
         * @public
         *
         * @returns {Promise<Post>} Resolves to the post the notification refers to
         *
         * @promise
         * @fulfill {Post} the Post the notification refers to
         */
        getPost() {
            return new forum.Post(this.data);
        }

        /**
         * Get the topic this Notification refers to
         *
         * @public
         *
         * @returns {Promise<Topic>} Resolves to the topic the notification refers to
         *
         * @promise
         * @fulfill {Topic} the Topic the notification refers to
         */
        getTopic() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Get the user who generated this Notification
         *
         * @public
         *
         * @returns {Promise<User>} Resolves to the user who generated this notification
         *
         * @promise
         * @fulfill {Post} the User who generated this notification
         */
        getUser() {
            return forum.User.getByName(this.data.nick);
        }

        /**
         * Get a notification
         *
         * @public
         * @static
         *
         * @param {string} notificationId The id of the notification to get
         * @returns {Promise<Notification>} resolves to the retrieved notification
         *
         *@promise
         * @fulfill {Notification} the retrieved notification
         */
        static get(notificationId) {
            throw new Error('E_IMPOSSIBLE');
        }

        /**
         * Activates when a new message is received
         *
         * @public
         * @static
         *
         * @param {*} payload The notification payload
         * @returns {Notification} the parsed notification
         */
        static receiveMessage(nick, to, text, message) {

            const notification = new Notification({
                nick: nick,
                to: to,
                text: text,
                message: message,
                type: 'message'
            });
            
            debug(`emitting notification: message in ${notification.topicId} was ${nick}:${text}`);
            forum.emit(`notification:message`, notification);
            forum.emit('notification', notification);
            
            if (text.indexOf(forum.username) > -1) {
                debug(`mention detected in "${text}"`);
                forum.emit('notification:mention', notification);
            }
            
            return Notification.processCommands(notification).then(() => Promise.resolve(notification));
        }
        
        static processCommands(notification) {
            const IDs = {
                post: -1,
                topic: notification.topicId,
                user: notification.userId,
                pm: -1,
                chat: -1    
            };
            
            debug(`processing commands`);
            return forum.Commands.get(IDs,
                    notification.body, 
                    (content) => forum.Post.reply(notification.topicId, 0, content)
                )
                .then((command) => {
                    debug(`Executing: ${command.commands.length} commands found`);
                    return command.execute();
                })
                .catch((err) => {
                    debug(`Error processing commands: ${err}`);
                    throw new Error(err);
                });
        }

        /**
         * Notification processor
         *
         * @typedef {NotificationProcessor}
         * @function
         *
         * @param {Notification} notification Notification to process
         * @returns {Promise} Resolves on completion
         */

        /**
         * Get all notifications
         *
         * @public
         * @static
         *
         * @param {NotificationProcessor} eachNotification Function to process notifications
         * @returns {Promise} Fulfills after notifications are processed
         *
         */
        static getNotifications(eachNotification) {
            return Promise.resolve();
        }

        /**
         * Activate notifications.
         *
         * Listen for new notifications and process ones that arrive
         */
        static activate() {
            debug(`notifications are active`);
            forum.client.addListener('message', Notification.receiveMessage);
            return Promise.resolve();
        }

        /**
         * Deactivate notifications
         *
         * Stop listening for new notifcations.
         */
        static deactivate() {
            forum.client.removeListener('message', Notification.receiveMessage);
            return Promise.resolve();
        }
    }

    return Notification;
};

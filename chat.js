'use strict';
/**
 * Example provider module Chat class
 * @module sockbot.providers.example.Chat
 * @author Accalia
 * @license MIT
 */
 
/**
 * Create a ChatRoom class and bind it to a forum instance
 *
 * @param {Provider} forum A forum instance to bind to constructed ChatRoom class
 * @returns {User} A ChatRoomPo class bound to the provided `forum` instance
 */
exports.bindChat = function bindChat(forum) {
    /**
     * Message Class
     *
     * Represents a message in a chatroom
     *
     * @public
     */
    class Message {
        /**
         * Construct a Message object from payload
         *
         * This constructor is intended to be private use only, if you need to construct a chat message from payload
         * data use `Message.parse()` instead
         *
         * @private
         * @class
         *
         * @param {*} payload Payload to construct the Message object out of
         */
        constructor(payload) {}

        /**
         * Chat message id
         *
         * @public
         *
         * @returns {number} Id of the chat message
         */
        get id() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Id of the chatroom this message belongs to
         *
         * @public
         *
         * @returns {number} Id of the ChatRoom this message belongs to
         */
        get room() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * User who sent this message
         *
         * @public
         *
         * @returns {User} User who authored this chat message
         */
        get from() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Identify if this message was created by current user
         *
         * @public
         *
         * @returns {boolean} True if message was sent by current user
         */
        get self() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Text content of message
         *
         * @public
         *
         * @returns {string} Content of the message with formatting and quotes removed
         */
        get content() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * DateTime the message was sent
         *
         * @public
         *
         * @returns {Date} datetime the message was sent
         */
        get sent() {
            return undefined; //Optional
        }

        /**
         * Message markup
         *
         * @public
         *
         * @returns {Promise<string>} Resolves to the HTML markup of the chat message
         */
        markup() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Reply to the chat message
         *
         * @public
         *
         * @param {string} content Message to reply with
         * @returns {Promise} Resolves once message has been sent
         */
        reply(content) {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Parse a Message from a given payload
         *
         * @public
         *
         * @param {string|object} payload Data to parse as a Message
         * @returns {Message} parsed Message
         */
        static parse(payload) {
            return new Message(payload);
        }
    }

    /**
     * ChatRoom Class
     *
     * Represents a chat room
     *
     * @public
     *
     */
    class ChatRoom {

        /**
         * Construct a ChatroomObject from payload
         *
         * This constructor is intended to be private use only, if you need to construct a chatroom from payload
         * data use `ChatRoom.parse()` instead
         *
         * @private
         * @class
         *
         * @param {*} payload Payload to construct the ChatRoom object out of
         */
        constructor(payload) {
            
        }

        /**
         * Get the chatroom id
         *
         * @public
         *
         * @returns {number} Id of the chatroom
         *
         */
        get id() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Get the chatroom name
         *
         * @public
         *
         * @returns {string} Name of the chatroom
         */
        get name() {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Get the users in the chatroom
         *
         * @public
         *
         * @returns {User[]} The users that were in teh chatroom when the room was retrieved
         */
        get users() {
            return undefined; // Optional
        }

        /**
         * Get the number of users in the chatroom
         *
         * @public
         *
         * @returns {number} Number of users in the chatroom
         */
        get participants() {
            return undefined; // Optional
        }

        /**
         * Get the owner of the chatroom
         *
         * @public
         *
         * @returns {User} Owning user for the chatroom
         */
        get owner() {
            return undefined; // Optional
        }

        /**
         * Retrieve the weblink for the Chatroom
         *
         * @public
         *
         * @returns {Promise<string>} Resolves to the URL web link to the chatroom
         */
        url() {
            return Promise.resolve(); // Optional
        }

        /**
         * Send a message to the chatroom
         *
         * @public
         *
         * @param {string} content Message to send to the chatroom
         * @returns {Promise} Resolves when message has been sent
         */
        send(content) {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Add a list of users to the chatroom
         *
         * @public
         *
         * @param {User|User[]} users User or Users to add to the chatroom
         * @returns {Promise} Resolves when all users have been added to the chatroom
         */
        addUsers(users) {
            return Promise.resolve(); // Optional, may not be supported by underlying forum
        }

        /**
         * Remove a list of users from the chatroom
         *
         * @public
         *
         * @param {User|User[]} users User or Users to remove from the chatroom
         * @returns {Promsie} Resos when users have been removed from the chatroom
         */
        removeUsers(users) {
            return Promise.resolve(); // Optional, may not be supported by underlying forum
        }

        /**
         * Leave the chatroom
         *
         * This will remove current user from the chat.
         *
         * @public
         *
         * @returns {Promise} Resolves when chatroom has been left
         */
        leave() {
            return Promise.resolve(); // Optional, may not be supported by underlying forum
        }

        /**
         * Rename the chat room
         *
         * @public
         *
         * @param {string} newName Name to set the chatroom to
         * @returns {Promise} Resolves when rename is complete
         */
        rename(newName) {
            return Promise.resolve(); // Optional, may not be supported by underlying forum
        }

        /**
         * Create a new chatroom, add a list of users to it and send a message.
         *
         * @public
         *
         * @param {User|User[]} users User or users to add to the chatroom
         * @param {string} message Message to send to the new chat room
         * @returns {Promise} Resolves once message has been sent
         */
        static create(users, message) {
            throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
        }

        /**
         * Activate chat features. newly received chat messages will be processed
         *
         * @public
         */
        static activate() {
            
        }

        /**
         * Deactivate the Chat features. This will stop new chat messages from being processed
         *
         * @public
         */
        static deactivate() {
            
        }

        /**
         * Retrieve a ChatRoom by a given ID
         *
         * @public
         *
         * @param {number} roomId Id of the chatroom to retrieve
         * @returns {Promise<ChatRoom>} Resolves to the chatroom requested
         */
        static get(roomId) {
            return ChatRoom.parse({});
        }

        /**
         * Parse a Chatroom object from payload
         *
         * @public
         *
         * @param {string|object} payload ChatRoom Payload
         * @returns {ChatRoom} Parsed Chatroom
         */
        static parse(payload) {
            return new ChatRoom(payload);
        }
    }
    ChatRoom.Message = Message;
    return ChatRoom;
};

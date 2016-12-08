'use strict';
/**
 * Example provider module
 * @module sockbot.providers.example
 * @author Accalia
 * @license MIT
 */

const EventEmitter = require('events').EventEmitter;
const debug = require('debug')('sockbot:providers:irc');

const postModule = require('./post'),
    topicModule = require('./topic'),
    userModule = require('./user'),
    notifications = require('./notification'),
    formatters = require('./format');

/**
 * Forum connector
 *
 * Connects to a forum
 */
class Forum extends EventEmitter {
    /**
     * Create a forum connector instance
     *
     * @public
     * @class
     *
     * @param {object} config Bot configuration data
     * @param {string} useragent Useragent to use for all requests
     */
    constructor(config, useragent) {
        super();
        this.Post = postModule.bindPost(this);
        this.Topic = topicModule.bindTopic(this);
        this.User = userModule.bindUser(this);
        this.Notification = notifications.bindNotification(this);
        this.PrivateMessage = this.Post;
        this.Format = formatters;
        
        this.config = config;
        
        this.IRC = require('irc');
        
        this._plugins = [];
        this.activated = false;
    }

    /**
     * Useragent used by the instance
     *
     * @public
     *
     * @type {string}
     */
    get useragent() {
        return 'Sockbot IRC Edition';
    }

    /**
     * Base URL for the forum
     *
     * @public
     *
     * @type {string}
     */
    get url() {
        throw new Error('E_UNSUPPORTED');
    }

    /**
     * Username bot will log in as
     *
     * @public
     *
     * @type{string}
     */
    get username() {
        return this.config.core.username;
    }

    /**
     * Logged in Bot Username
     *
     * @public
     *
     * @type {User}
     */
    get user() {
        return new Forum.User({
            nick: this.username,
            realname: this.username,
            host: 'localhost'
        });
    }

    /**
     * Bot instance Owner user
     *
     * @public
     *
     * @type {User}
     */
    get owner() {
        return this.config.core.owner;
    }

    /**
     * Get Commands object bound to this instance
     *
     * @public
     *
     * @type {Commands}
     */
    get Commands() {
        return this._commands;
    }

    /**
     * Store Commands object bound to this instance
     *
     * @private
     *
     * @param {Commands} commands commands Instance
     */
    set Commands(commands) {
        this._commands = commands;
    }

    /**
     * Login to forum instance
     *
     * @returns {Promise<Forum>} Resolves to logged in forum
     *
     * @promise
     * @fulfill {Forum} Logged in forum
     */
    login() {
         //Allow users to set the nickserv nick
        if (!this.activated) {
            return Promise.resolve();
        }
        const nickServ = this.config.core.nickServ || 'NickServ';
        this.client.say(nickServ, `IDENTIFY ${this.config.core.password}`);
        return Promise.resolve();
    }

    /**
     * Plugin Generator Function
     *
     * @typedef {PluginFn}
     * @function
     *
     * @param {Forum} forum Forum provider instance
     * @param {object} config Plugin configuration
     * @returns {Plugin} Generated plugin
     *
     */

    /**
     * Plugin Generator Object
     *
     * @typedef {PluginGenerator}
     *
     * @property {PluginFn} plugin Plugin generating function
     *
     */

    /**
     * Promising Function
     *
     * @typedef {promiseFunction}
     * @function
     *
     * @returns {Promise} Resolves when function is complete
     *
     */

    /**
     * Plugin Object
     *
     * @typedef {Plugin}
     *
     * @property {promiseFunction} activate Activates plugin
     * @property {promiseFunction} deactivate Deactivates plugin
     *
     */

    /**
     * Add a plugin to this forum instance
     *
     * @public
     *
     * @param {PluginFn|PluginGenerator} fnPlugin Plugin Generator
     * @param {object} pluginConfig Plugin configuration
     * @returns {Promise} Resolves on completion
     *
     * @promise
     * @fulfill {*} Plugin addedd successfully
     * @reject {Error} Generated plugin is invalid
     */
    addPlugin(fnPlugin, pluginConfig) {
        return new Promise((resolve, reject) => {
            let fn = fnPlugin;
            if (typeof fn !== 'function') {
                fn = fn.plugin;
            }
            const plugin = fn(this, pluginConfig);
            if (typeof plugin !== 'object') {
                return reject('[[invalid_plugin:no_plugin_object]]');
            }
            if (typeof plugin.activate !== 'function') {
                return reject('[[invalid_plugin:no_activate_function]]');
            }
            if (typeof plugin.deactivate !== 'function') {
                return reject('[[invalid_plugin:no_deactivate_function]]');
            }
            this._plugins.push(plugin);
            return resolve();
        });
    }

    /**
     * Activate forum and plugins
     *
     * @returns {Promise} Resolves when all plugins have been enabled
     */
    activate() {
        this.client = new this.IRC.Client(this.config.core.server, this.username, {
            channels: this.config.core.channels || [],
            realName: this.useragent,
            floodProtection: true,
            floodProtectionDelay: 500,
        });
        
        this.client.addListener('error', (raw) => {
            if (raw.command === 'err_notregistered') {
                this.emit('log', `Greetings, traveller! We notice you have not registered the bot's nick, '${this.username}'. 
                            Please do so; this prevents the bot from having nick collisions. Thank you.`);
            }
            debug('ERR: ' + raw.command);
        });
        
        this.activated = true;
        
        return this.login()
            .then(() => this.Notification.activate())
            .then(() => {
                return Promise.all(this._plugins.map((plugin) => plugin.activate()));
            });
    }

    /**
     * Deactivate forum and plugins
     *
     * @returns {Promise} Resolves when all plugins have been disabled
     */
    deactivate() {
        this.activated = false;
        throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
    }
    
    /**
     * Check if the forum supports a given functionality
     *
     * @returns {Boolean} Whether or not the forum supports a given function
     */
    supports(supportString) {
        const supported = [
            'Users',
            'Posts',
            'Topics',
            'Notifications',
            'PrivateMessage',
            'Formatting'
        ];

        let support = false;
        
        if (Array.isArray(supportString)) {
            support = supportString.reduce((value, item) => { 
                return value && this.supports(item);
            }, true);
            return support;
        }
        
        if (supported.indexOf(supportString) > -1) {
            support = true;
        }
 
        return support;
    }
}
module.exports = Forum;

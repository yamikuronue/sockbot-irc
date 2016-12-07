'use strict';
/**
 * Example provider module
 * @module sockbot.providers.example
 * @author Accalia
 * @license MIT
 */

const EventEmitter = require('events').EventEmitter;


const postModule = require('./post'),
    topicModule = require('./topic'),
    categoryModule = require('./category'),
    userModule = require('./user'),
    notifications = require('./notification'),
    PMModule = require('./pm'),
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
        this.Category = categoryModule.bindCategory(this);
        this.User = userModule.bindUser(this);
        this.Notification = notifications.bindNotification(this);
        this.PrivateMessage = PMModule.bindPM(this);
        this.Format = formatters;
        
        this.config = config;
        
        this.IRC = require('irc');
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
        throw new Error('E_REQUIRED_FUNCTION_NOT_IMPLEMENTED');
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
        const nickServ = this.config.core.nickServ || 'NickServ';
        this.client.say(nickServ, `IDENTIFY ${this.config.core.password}`);
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
        
        return this.Notification.activate().then(() => {
            return Promise.all(this._plugins.map((plugin) => plugin.activate()));
        });
    }

    /**
     * Deactivate forum and plugins
     *
     * @returns {Promise} Resolves when all plugins have been disabled
     */
    deactivate() {
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

'use strict';

const chai = require('chai');

chai.use(require('chai-as-promised'));
chai.use(require('chai-string'));
chai.should();

const sinon = require('sinon');
require('sinon-as-promised');
chai.use(require('sinon-chai'));

const Forum = require('../src/index');
describe('providers/example/format', () => {
    it('should export a function()', () => {
        Forum.should.be.a('function');
    });
    
    const requiredFunctions = ['activate', 'deactivate', 'addPlugin', 'login'];
    const testModule = new Forum();
    
    requiredFunctions.forEach((fn) => {
        it(`should export ${fn}()'`, () => {
            chai.expect(testModule[fn]).to.be.a('function');
        });
    });
    
    describe('supports', () => {
        let forum = null,
            sandbox = null;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            forum = new Forum({
                core: {}
            });
            sandbox.stub(forum.Notification, 'deactivate');
            sandbox.stub(forum.PrivateMessage, 'deactivate');
        });
        afterEach(() => sandbox.restore());
        
        it('must expose a method named supports', () => {
            forum.supports.should.be.a('function');
        });
        
        it('must return false if a capability is unsupported', () => {
            forum.supports('Jack').should.be.false;
            forum.supports('PMs').should.be.false;
        });
        
        it('must return true if a capability is supported', () => {
            forum.supports('PrivateMessage').should.be.true;
            forum.supports('Users').should.be.true;
            forum.supports('Posts').should.be.true;
            forum.supports('Topics').should.be.true;
            forum.supports('Notifications').should.be.true;
            forum.supports('Formatting').should.be.true;
        });
        
        it('must return false if a sub-capability is not supported', () => {
            forum.supports('Jack.Skellington').should.be.false;
            forum.supports('Chats.WithJackSkellington').should.be.false;
        });
        
        it('should return true if all items in an array are supported', () => {
            forum.supports(['Users', 'PrivateMessage']).should.be.true;
        });
       
        it('must return false if any items in an array are not supported', () => {
            forum.supports(['Users', 'PrivateMessage', 'Halloween']).should.be.false;
        });
    });
});
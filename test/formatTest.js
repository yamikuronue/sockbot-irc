'use strict';

const chai = require('chai');

chai.use(require('chai-as-promised'));
chai.use(require('chai-string'));
chai.should();


const testModule = require('../src/format');
describe('providers/example/format', () => {
    describe('exports', () => {
        const fns = ['urlForPost', 'urlForTopic', 'quoteText', 'link', 'image', 'spoiler',
            'italic', 'bold', 'bolditalic', 'header1', 'header2', 'header3', 'header4',
            'header5', 'header6', 'preformat', 'strikethrough', 'list'
        ];
        fns.forEach((fn) => {
            it(`should export '${fn}()'`, () => {
                chai.expect(testModule[fn]).to.be.a('function');
            });
            it(`should resolve '${fn}()'`, () => {
                testModule[fn]('A string').should.resolve;
            });
        });
        it('should only have expected functions', () => {
            testModule.should.have.all.keys(fns);
        });
    });
});

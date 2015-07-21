/**
 * Created by daisy on 15/7/21.
 */
var expect = require('chai').expect;
var input = require('../lib/input');

describe('input', function () {
    describe('invalid value', function () {

        describe('without any pattern', function () {

            describe('and default', function () {
                it('should throw error when data is not undefined', function () {
                    var data = {};
                    expect(function () {
                        input(data, 'name');
                    }).to.throw(input.InvalidInputError, 'Invalid input name');
                });

                it('should throw error when data is undefined', function () {
                    expect(function () {
                        input(undefined, 'name');
                    }).to.throw(input.InvalidInputError, 'Invalid input name');
                });
            });

            describe('but default', function () {
                it('should get the default value when data is not undefined', function () {
                    var data = {};
                    expect(input(data, 'name', undefined, 'jackong')).to.be.equal('jackong');
                });

                it('should also get the default when data is undefined', function () {
                    expect(input(undefined, 'name', undefined, 'jackong')).to.be.equal('jackong');
                });
            });

            describe('but default function', function () {
                it('should get the default value', function () {
                    var data = {};
                    expect(input(data, 'name', undefined, function () {
                        return 'jackong';
                    })).to.be.equal('jackong');
                });
            });

            describe('but custom error handler', function () {
                var originError = input.error;
                before(function () {
                    input.error = function (name) {
                        return new input.InvalidInputError('Invalid data input ' + name);
                    };
                });
                after(function () {
                    input.error = originError;
                });

                it('should throw custom error', function () {
                    var data = {};
                    expect(function () {
                        input(data, 'name');
                    }).to.throw(input.InvalidInputError, 'Invalid data input name');
                });
            });

            describe('but special error', function () {
                it('should throw custom error', function () {
                    var data = {};
                    expect(function () {
                        input(data, 'name', undefined, undefined, new input.InvalidInputError('invalid input'));
                    }).to.throw(input.InvalidInputError, 'invalid input');
                });
            });
        });

        describe('with regex pattern', function () {
            describe('and default', function () {

            });

            describe('but default', function () {

            });
        });

        describe('with function pattern', function () {
            describe('and default', function () {

            });

            describe('but default', function () {

            });
        });

        describe('with object pattern', function () {
            describe('and default', function () {

            });

            describe('but default', function () {

            });
        });

        describe('with array pattern', function () {
            describe('and default', function () {

            });

            describe('but default', function () {

            });
        });

        describe('with basic-type pattern', function () {
            describe('and default', function () {

            });

            describe('but default', function () {

            });
        });
    });

    describe('valid value', function () {
        describe('without any pattern', function () {

            describe('and default', function () {

            });

            describe('but default', function () {

            });

        });

        describe('with regex pattern', function () {
            describe('and default', function () {

            });

            describe('but default', function () {

            });
        });

        describe('with function pattern', function () {
            describe('and default', function () {

            });

            describe('but default', function () {

            });
        });

        describe('with object pattern', function () {
            describe('and default', function () {

            });

            describe('but default', function () {

            });
        });

        describe('with array pattern', function () {
            describe('and default', function () {

            });

            describe('but default', function () {

            });
        });

        describe('with basic-type pattern', function () {
            describe('and default', function () {

            });

            describe('but default', function () {

            });
        });
    });
});
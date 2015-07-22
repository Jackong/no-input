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
                    input.onError(function (name) {
                        return new input.InvalidInputError('Invalid data input ' + name);
                    })
                });
                after(function () {
                    input.onError(originError);
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

        describe('with regexp pattern', function () {
            var data = {name: 'jack'};
            describe('and default', function () {
                it('should throw error', function () {
                    expect(function () {
                        input(data, 'name', /^(jackong|daisy)$/);
                    }).to.throw(input.InvalidInputError, 'Invalid input name');
                });
            });

            describe('but default', function () {
                it('should get the default', function () {
                    expect(input(data, 'name', /^(jackong|daisy)$/, 'jackong')).to.be.equal('jackong');
                });
            });
        });

        describe('with function pattern', function () {
            var data = {name: 'jack'};
            describe('and default', function () {
                it('should throw error', function () {
                    expect(function () {
                        input(data, 'name', function (value) {
                            return value === 'jackong';
                        });
                    }).to.throw(input.InvalidInputError, 'Invalid input name');
                });
            });

            describe('but default', function () {
                it('should get the default', function () {
                    expect(input(data, 'name', function (value) {
                        return value === 'jackong';
                    }, 'daisy')).to.be.equal('daisy');
                });
            });
        });

        describe('with object pattern', function () {
            var data = {status: 'unknown'};
            describe('and default', function () {
                it('should throw error', function () {
                    expect(function () {
                        input(data, 'status', {normal: 1, invalid: 2});
                    }).to.throw(input.InvalidInputError, 'Invalid input status');
                });
            });

            describe('but default', function () {
                it('should get the default', function () {
                    expect(input(data, 'status', {normal: 1, invalid: 2}, 1)).to.be.equal(1);
                });
            });
        });

        describe('with array pattern', function () {
            var data = {type: 'pig'};
            describe('and default', function () {
                it('should throw error', function () {
                    expect(function () {
                        input(data, 'type', ['cat', 'dog']);
                    }).to.throw(input.InvalidInputError, 'Invalid input type');
                });
            });

            describe('but default', function () {
                it('should get the default', function () {
                    expect(input(data, 'type', ['cat', 'dog'], 'pig')).to.be.equal('pig');
                });
            });
        });

        describe('with basic-type pattern', function () {
            var data = {type: 'pig'};
            describe('and default', function () {
                it('should throw error', function () {
                    expect(function () {
                        input(data, 'type', 'cat');
                    }).to.throw(input.InvalidInputError, 'Invalid input type');
                });
            });

            describe('but default', function () {
                it('should get the default', function () {
                    expect(input(data, 'type', 'cat', 'pig')).to.be.equal('pig');
                });
            });
        });

        describe('with object argument', function () {
            var data = {type: 'pig'};
            describe('with default', function () {
                it('should throw error', function () {
                    expect(function () {
                        input(data, {name: 'type', pattern: /^(cat|dog)$/});
                    }).to.throw(input.InvalidInputError, 'Invalid input type');
                });
            });

            describe('without default', function () {
                it('should get the default', function () {
                    expect(input(data, {name: 'type', pattern: /^(cat|dog)$/, default: 'pig'})).to.be.equal('pig');
                });
            });
        });
    });

    describe('valid value', function () {
        describe('without any pattern', function () {
            var data = {name: 'jack'};
            describe('and default', function () {
                it('should get the value', function () {
                    expect(input(data, 'name')).to.be.equal('jack');
                });
            });

            describe('but default', function () {
                it('should get the value', function () {
                    expect(input(data, 'name', undefined, 'jackong')).to.be.equal('jack');
                });
            });

        });

        describe('with regex pattern', function () {
            var data = {name: 'jack'};
            describe('and default', function () {
                it('should get the value', function () {
                    expect(input(data, 'name', /^(jack|daisy)$/)).to.be.equal('jack');
                });
            });

            describe('but default', function () {
                it('should get the value', function () {
                    expect(input(data, 'name', /^(jack|daisy)$/, 'jackong')).to.be.equal('jack');
                });
            });
        });

        describe('with function pattern', function () {
            var data = {name: 'jack'};
            describe('and default', function () {
                it('should get the value', function () {
                    expect(input(data, 'name', function (value) {
                        return value === 'jack';
                    })).to.be.equal('jack');
                });
            });

            describe('but default', function () {
                it('should get the value', function () {
                    expect(input(data, 'name', function (value) {
                        return value === 'jack';
                    }, 'jackong')).to.be.equal('jack');
                });
            });
        });

        describe('with object pattern', function () {
            var data = {name: 'jack'};
            describe('and default', function () {
                it('should get the value', function () {
                    expect(input(data, 'name', {jack: 18, daisy: 19})).to.be.equal(18);
                });
            });

            describe('but default', function () {
                it('should get the value', function () {
                    expect(input(data, 'name', {jack: 18, daisy: 19}, 'jackong')).to.be.equal(18);
                });
            });
        });

        describe('with array pattern', function () {
            var data = {name: 'jack'};
            describe('and default', function () {
                it('should get the value', function () {
                    expect(input(data, 'name', ['jack', 'daisy'])).to.be.equal('jack');
                });
            });

            describe('but default', function () {
                it('should get the value', function () {
                    expect(input(data, 'name', ['jack', 'daisy'], 'jackong')).to.be.equal('jack');
                });
            });
        });

        describe('with basic-type pattern', function () {
            var data = {name: 'jack'};
            describe('and default', function () {
                it('should get the value', function () {
                    expect(input(data, 'name', 'jack')).to.be.equal('jack');
                });
            });

            describe('but default', function () {
                it('should get the value', function () {
                    expect(input(data, 'name', 'jack', 'jackong')).to.be.equal('jack');
                });
            });
        });
    });
});
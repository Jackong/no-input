/**
 * Created by daisy on 15/7/21.
 */
var _ = require('underscore');
var Input = module.exports = function (data, name, pattern, defaultValue, error) {
    if (!_.isObject(data) || !(name in data)) {
        if (_.isUndefined(defaultValue)) {
            throw Input.getError(name, error);
        }
        return Input.getDefault(defaultValue);
    }
};

Input.InvalidInputError = function MyError(message) {
    this.name = 'InvalidInputError';
    this.message = message || 'Invalid input';
};
Input.InvalidInputError.prototype = Object.create(Error.prototype);
Input.InvalidInputError.prototype.constructor = Input.InvalidInputError;

Input.error = function (name) {
    return new Input.InvalidInputError('Invalid input ' + name);
};

Input.getError = function (name, error) {
    var err = Input.error(name);
    return err;
};

Input.getDefault = function (defaultValue) {
    return _.isFunction(defaultValue) ? defaultValue() : defaultValue;
};
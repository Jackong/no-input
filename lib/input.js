/**
 * Created by daisy on 15/7/21.
 */
var _ = require('underscore');
var Input = module.exports = function (data, name, pattern, defaultValue, error) {
    if (_.isObject(name)) {
        pattern = name['pattern'];
        defaultValue = name['default'];
        error = name['error'];
        name = name['name'];
    }
    if (!_.isObject(data) || !(name in data)) {
        if (_.isUndefined(defaultValue)) {
            throw Input.getError(name, error);
        }
        return Input.getDefault(defaultValue);
    }
    var value = Input.validate(data[name], pattern);
    if (_.isUndefined(value)) {
        if (_.isUndefined(defaultValue)) {
            throw Input.getError(name, error);
        }
        return Input.getDefault(defaultValue);
    }
    return value;
};

Input.InvalidInputError = function (message) {
    this.name = 'InvalidInputError';
    this.message = message || 'Invalid input';
};
Input.InvalidInputError.prototype = Object.create(Error.prototype);
Input.InvalidInputError.prototype.constructor = Input.InvalidInputError;


Input.onError = function (fn) {
    Input.error = fn;
};

Input.error = function (name) {
    return new Input.InvalidInputError('Invalid input ' + name);
};


Input.getError = function (name, error) {
    if (!_.isObject(error)) {
        return Input.error(name);
    }
    return _.extend(Input.error(name), error);
};

Input.getDefault = function (defaultValue) {
    return _.isFunction(defaultValue) ? defaultValue() : defaultValue;
};

Input.validate = function (value, pattern) {
    if (_.isUndefined(pattern)) {
        return value;
    }
    if (_.isRegExp(pattern)) {
        return _.isNull(pattern.exec(value)) ? undefined : value;
    }
    if (_.isFunction(pattern)) {
        return pattern(value) ? value : undefined;
    }

    if (_.isArray(pattern)) {
        return _.indexOf(pattern, value) > -1 ? value : undefined;
    }

    if (_.isObject(pattern)) {
        return _.has(pattern, value) ? pattern[value] : undefined;
    }
    return pattern === value ? value : undefined;
};
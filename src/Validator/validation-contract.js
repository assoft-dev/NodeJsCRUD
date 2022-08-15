'use strict';

let errors = [];

exports.isRequired = async (value, message) => {
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

exports.hasMinLen = async (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}

exports.hasMaxLen = async (value, max, message) => {
    if (!value || value.length > max)
        errors.push({ message: message });
}

// HasMaxLenght

// IsFixedLenght

// IsEmail
exports.hasEmail = (value, message) => {
    var res = String(value)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    if (!res) {
        errors.push({ message: message });
    }
};

exports.errors = errors;

exports.clear = async () => {
    errors = [];
}

exports.isValid = async () => {
    return errors.length == 0;
}
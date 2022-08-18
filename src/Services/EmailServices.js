'use strict'

var config = require("../config/config");

var sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(config.sendgridKey);

exports.Sender = (to, assunto, corpo, narratva) => {
    sendGrid.send({
        to: to,
        from: 'assoft@outlook.pt',
        subject: assunto,
        html: corpo,
        text: narratva,
    });
}
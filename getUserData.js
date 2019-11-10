'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region:"us-east-1"});

exports.handler = function (event, context, callback) {
    const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    const documentClient = new AWS.DynamoDB.DocumentClient({region:"us-east-1"});

    const params = {
        TableName: "tes",
        Key: {
            id : "12345"
        }
    }

    documentClient.get(params, (err, data) => {
        if (err){
            console.log(err);
        }
        console.log(data);
    })
}
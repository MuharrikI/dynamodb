'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

    let responsBody = "";
    let statusCode = 0;

    const { id, firstname, lastname } = JSON.parse(event.body);
    const params = {
        TableName: "tes",
        Item: {
            id: id,
            firstname: firstname,
            lastname: lastname
        }
    }

    try {
        const data = await documentClient.put(params).promise();
        responsBody = JSON.stringify(data);
        statusCode = 201;
    } catch (err) {
        responsBody = "Unable to process";
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "test header" : "test"
        },
        body: responsBody
    }

    return response;
}
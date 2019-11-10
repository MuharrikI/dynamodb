'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

    let responsBody = "";
    let statusCode = 0;

    const { id } = event.pathParameters;

    const params = {
        TableName: "tes",
        Key: {
            id: id
        }
    }

    try {
        const data = await documentClient.get(params).promise();
        responsBody = JSON.stringify(data.Item);
        statusCode = 200;
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
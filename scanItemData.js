'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1" });

exports.handler = async (event) => {

    const { table, filter, val } = event;
    // const table = 'tablemotherboard';
    // const filter = 'chipset';
    // const val = 'X99';
    // console.log(event);

    var params = {
        TableName: table,
        FilterExpression: `${filter} = :cs`,
        ExpressionAttributeValues: { ':cs': val }
    };
    // console.log(params.FilterExpression);

    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
    let responsBody = "";
    let statusCode = 0;


    try {
        const data = await documentClient.scan(params).promise();
        responsBody = JSON.stringify(data);
        statusCode = 200;
    } catch (e) {
        console.log(e);
        responsBody = "Unable to process";
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        body: responsBody
    }

    return response;
};

// "Content-Type" : "application/json"

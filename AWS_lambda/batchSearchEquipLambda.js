const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  try {
    let result;
    if (event.path === "/equipment/search") {
      result = await dynamo
        .scan({
          TableName: "equipment",
          Limit: event.queryStringParameters.limit,
        })
        .promise();
    } else {
      result = await dynamo
        .scan({
          TableName: "equipment",
        })
        .promise();
    }
    body = result.Items;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }
  return {
    statusCode,
    body,
    headers,
  };
};

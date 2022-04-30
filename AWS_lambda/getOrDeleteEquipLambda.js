const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin" : "*" 
  };
  try {
    switch (event.httpMethod) {
      case "GET":
        const result = await dynamo
          .get({
            TableName: "equipment",
            Key: {
              equipNum: event.pathParameters.id,
            },
          })
          .promise();
        body = [result.Item];
        break;
      case "DELETE":
        body = await dynamo
          .delete({
            TableName: "equipment",
            Key: {
              equipNum: event.pathParameters.id,
            },
          })
          .promise();
        break;
      default:
        body = JSON.stringify(event);
    }
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

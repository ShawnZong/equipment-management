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
    const newEquipment = JSON.parse(event.body);
    body = await dynamo
      .put({
        TableName: "equipment",
        Item: {
          equipNum: newEquipment.equipNum,
          address: newEquipment.address,
          contractStart: newEquipment.contractStart,
          contractEnd: newEquipment.contractEnd,
          status: newEquipment.status,
        },
        ConditionExpression: "attribute_not_exists(equipNum)",
      })
      .promise();
  } catch (err) {
    if (err.code === "ConditionalCheckFailedException") {
      statusCode = 400;
      body = "Duplicate data";
    } else {
      statusCode = 400;
      body = err;
    }
  } finally {
    body = JSON.stringify(body);
  }
  return {
    statusCode,
    body,
    headers,
  };
};

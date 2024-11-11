const users = require('../mockDataBase/users');
const { v4 } = require('uuid');
const { 
  docClient,
  QueryCommand,
  PutCommand,
  ScanCommand,
  DeleteCommand,
  UpdateCommand
} = require('../aws/awsClients');
const { LoginError } = require('../errors/LoginError');

/**
 * returns user that has matching userName
 * throws LoginError if no user is found
 * 
 * @param {string} userName 
 * @returns {object}
 */
const getUserByUsername = async (userName) => {
  const queryCommand = new QueryCommand({
    TableName: 'Users',
    ExpressionAttributeValues: {
      ':userName': userName,
    },
    KeyConditionExpression: 'userName = :userName',
    ConsistentRead: true,
  });

  const response = await docClient.send(queryCommand);
  if(response?.Items?.length > 0) {
    return response.Items[0];
  }
  throw new LoginError('No User Found');
}

/**
 * returns user that has matching email
 * 
 * @param {string} email 
 * @returns {object}
 */
const getUserByEmail = async (email) => {
  const scanCommand = new ScanCommand({
    TableName: "Users",
    ExpressionAttributeValues: {
      ':email': email,
    },
    FilterExpression: 'email = :email',
    ProjectionExpression: "userName, email",
  });

  const response = await docClient.send(scanCommand);

  if(response?.Items?.length > 0) {
    return response.Items[0];
  }
  throw new LoginError('No User Found');
}

const updateUser = async (user) => {
  const toUpdate = new UpdateCommand({
    TableName: 'Users',
    Key: {
      userName: user.userName,
    },
    UpdateExpression: 'set password = :password, email = :email',
    ExpressionAttributeValues: {
      ":password": user.password,
      ":email": user.email
    },
    ReturnValues: "ALL_NEW",
  });
  const response = await docClient.send(toUpdate);
  return response;
}

const addUser = async (user) => {
  const toPut = new PutCommand({
    TableName: 'Users',
    Item: user 
  });
  const response = await docClient.send(toPut);
  return response;
}

const login = async (userName, password) => {
  const user = await getUserByUsername(userName);
  return user;
}

const deleteUser = async (userName) => {
  const toPut = new DeleteCommand({
    TableName: 'Users',
    Key: {
      userName,
    }
  });
  const response = await docClient.send(toPut);
  return response;
}

module.exports = {
  getUserByUsername,
  getUserByEmail,
  addUser,
  login,
  deleteUser,
  updateUser
}

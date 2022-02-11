const { ObjectId } = require('mongodb');
const connection = require('./connection');

const DB_COLLECTION = 'users';

const findUserByEmail = async (email) => {
  const db = await connection();

  const user = await db.collection(DB_COLLECTION).findOne({ email });

  return user;
};

const findUserById = async (id) => {
  const db = await connection();

  const user = await db.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) });

  return user;
};

const createUser = async (newUser) => {
  const db = await connection();

  const { insertedId } = await db.collection(DB_COLLECTION).insertOne(newUser);

  return { _id: insertedId };
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};

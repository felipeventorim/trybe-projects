const { ObjectId } = require('mongodb');
const connection = require('./connection');

const DB_COLLECTION = 'recipes';

const addRecipe = async (newRecipe) => {
  const db = await connection();

  const { insertedId } = await db.collection(DB_COLLECTION).insertOne(newRecipe);

  return insertedId;
};

const getAllRecipes = async () => {
  const db = await connection();

  const recipes = await db.collection(DB_COLLECTION).find().toArray();

  return recipes;
};

const getRecipe = async (id) => {
  const db = await connection();

  const recipe = await db.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) });

  return recipe;
};

const updateRecipe = async (recipeToUpdate, id) => {
  const db = await connection();

  await db.collection(DB_COLLECTION).updateOne(
    { _id: ObjectId(id) },
    { $set: { ...recipeToUpdate } },
  );
};

const deleteRecipe = async (id) => {
  const db = await connection();

  await db.collection(DB_COLLECTION).deleteOne({ _id: ObjectId(id) });
};

const addImage = async (id) => {
  const db = await connection();

  await db.collection(DB_COLLECTION).updateOne(
    { _id: ObjectId(id) },
    { $set: { image: `localhost:3000/src/uploads/${id}.jpeg` } },
  );
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  addImage,
};

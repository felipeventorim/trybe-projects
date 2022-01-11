const { ObjectId } = require('mongodb'); 
const connection = require('./connection');

const DB_COLLECTION = 'sales';

const addSales = async (sales) => {
  const db = await connection();
  
  const { insertedId } = await db.collection(DB_COLLECTION).insertOne({ itensSold: sales });

  return insertedId;
};

const getAllSales = async () => {
  const db = await connection();

  const sales = await db.collection(DB_COLLECTION).find().toArray();

  return sales;
};

const getSaleById = async (id) => {
  const db = await connection();

  const sale = await db.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) });

  return sale;
};

const updateSale = async (id, sale) => {
  const db = await connection();

  await db.collection(DB_COLLECTION)
      .updateOne(
          { _id: ObjectId(id) },
          { $set: { itensSold: sale } },
      );
};

const deleteSale = async (id) => {
  const db = await connection();

  const deletedSale = await db.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) });

  await db.collection(DB_COLLECTION).deleteOne({ _id: ObjectId(id) });

  return deletedSale;
};

module.exports = {
  addSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};

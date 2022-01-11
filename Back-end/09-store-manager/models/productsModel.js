const { ObjectId } = require('mongodb'); 
const connection = require('./connection');
const errorHandling = require('../utils/functions/errorHandling');
const { unprocessableEntity } = require('../utils/dictionary/statusCode');
const { invalidData, alreadyExists } = require('../utils/dictionary/messagesDefault');

const DB_COLLECTION = 'products';

const findByName = async (db, name) => db.collection(DB_COLLECTION).findOne({ name });
const findById = async (db, id) => db.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) });

const addProduct = async (name, quantity) => {
    const db = await connection();
    
    const isRepeatedProduct = await findByName(db, name);

    if (isRepeatedProduct) throw errorHandling(unprocessableEntity, invalidData, alreadyExists);

    const { insertedId } = await db.collection(DB_COLLECTION).insertOne({ name, quantity });

    return insertedId;
};

const getAllProducts = async () => {
    const db = await connection();

    const products = await db.collection(DB_COLLECTION).find().toArray();

    return products;
};

const getProductById = async (id) => {
    const db = await connection();

    const product = await findById(db, id);

    return product;
};

const updateProduct = async (id, name, quantity) => {
    const db = await connection();

    await db.collection(DB_COLLECTION)
        .updateOne(
            { _id: ObjectId(id) },
            { $set: { name, quantity } },
            (err) => {
                if (err) throw err;
            },
        );
};

const updateProductQuantity = async (id, quantity) => {
    const db = await connection();

    await db.collection(DB_COLLECTION)
        .updateOne(
            { _id: ObjectId(id) },
            { $inc: { quantity } },
        );
};

const deleteProduct = async (id) => {
    const db = await connection();

    const deletedProduct = await findById(db, id);

    await db.collection(DB_COLLECTION).deleteOne({ _id: ObjectId(id) });

    return deletedProduct;
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    updateProductQuantity,
    deleteProduct,
};

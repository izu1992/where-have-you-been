import db from "./db";

const COLLECTION_NAME = "todos";

export const getAll = () => db.get(COLLECTION_NAME);
export const getOne = (key) => db.get(COLLECTION_NAME + "/" + key);
export const update = (key, data) => db.update(COLLECTION_NAME + "/" + key, data);
export const create = (data) => db.create(COLLECTION_NAME, data);
export const remove = (key) => db.remove(COLLECTION_NAME + "/" + key);

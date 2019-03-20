const Datastore = require('nedb');

const db = new Datastore({ filename: './extra/typerace/server/models/db/users' });

db.loadDatabase();

class User {
  static async create(login, password) {
    return new Promise((resolve, reject) => {
      db.insert({ login, password }, (err, newDoc) => {
        if (err) {
          reject(err);
        }

        this.id = newDoc._id;
        resolve(newDoc._id);
      });
    });
  }

  static async get(login, password, id) {
    const findParams = id ? { _id: id } : { login, password };

    return new Promise((resolve, reject) => {
      db.findOne(findParams, (err, user) => {
        if (err) {
          reject(err);
        }

        if (!user) {
          resolve();
          return;
        }

        resolve(user);
      });
    });
  }
}

module.exports = User;

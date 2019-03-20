const Datastore = require('nedb');

const db = new Datastore({ filename: './extra/typerace/server/models/db/stats' });

db.loadDatabase();

class Stat {
  static async add(speed, userId) {
    return new Promise((resolve, reject) => {
      db.findOne({ userId }, (err, stat) => {
        if (err) {
          reject(err);
        }

        db.insert({ userId, speed }, (err, newDoc) => {
          if (err) {
            reject(err);
          }

          resolve(newDoc);
        });

        // const { maxSpeed } = stat;

        // if (newSpeed > maxSpeed) {
        //   db.update({ userId }, { $set: { maxSpeed: newSpeed } }, {}, (err, num, affDoc) => {
        //     if (err) {
        //       reject(err);
        //     }

        //     resolve(affDoc);
        //   });
        // }

        // resolve();
      });
    });
  }

  static async getBestByUser(userId) {
    return new Promise((resolve, reject) => {
      db.find({ userId })
        .sort({ speed: -1 })
        .limit(1)
        .exec((err, rec) => {
          if (err) {
            reject(err);
          }

          resolve(rec);
        });
    });
  }

  static async getLast(num) {
    return new Promise((resolve, reject) => {
      db.find({})
        .sort({ speed: -1 })
        .limit(num)
        .exec((err, docs) => {
          if (err) {
            reject(err);
          }

          resolve(docs);
        });
    });
  }
}

module.exports = Stat;

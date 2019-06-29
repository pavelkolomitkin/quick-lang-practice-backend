module.exports = {
  up(db) {
    // TODO write your migration here. Return a Promise (and/or use async & await).
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // return db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

      db.collection('users').createIndex({ email: 1 }, { unique: true });
      db.collection('registerkeys').createIndex({ key: 1 }, { unique: true });
      db.collection('passwordrestorekeys').createIndex({ key: 1 }, { unique: true });

  },

  down(db) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // return db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
      db.collection('users').dropIndex({ email: 1 });
      db.collection('registerkeys').dropIndex({ key: 1 });
      db.collection('passwordrestorekeys').dropIndex({ key: 1 });

  }
};

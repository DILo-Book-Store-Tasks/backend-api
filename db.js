const m = require("mongoose");

m.connect(
  `mongodb://localhost:27017/${process.env.DB_NAME}`,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => console.log(`MongoError: ${err}`)
);
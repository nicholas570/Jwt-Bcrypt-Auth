const express = require('express');
const cors = require('cors');
const api = require('./routes/api');

const port = process.env.PORT || 8080;
const corsOptions = {
  origin: 'http://localhost:8080',
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api', api);

app.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    // eslint-disable-next-line
    console.log(`server listening on port: ${port}`);
  }
});

import route from './routes/index';

import {express} from "express";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`app listening on port : ${PORT}`);
});
app.use('/', route);

module.exports = app;

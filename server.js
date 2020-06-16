const expressGraphQL = require('express-graphql');
const express = require('express');
const { buildSchema } = require('graphql');

const morgan = require('morgan');
const cors = require('cors');

const path = require('path');
const rfs = require('rotating-file-stream');
const Material = require('./models/Material');
const Category = require('./models/Category');
const connectDB = require('./config/db');

const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

const accessLogStream = rfs.createStream('access.log', {
  interval: '3d',
  path: path.join(__dirname, 'logs'),
});

const app = express();
app.use(cors());
connectDB();

app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));
app.use(express.json({ extended: false }));

app.use(
  '/graphql',
  expressGraphQL({
    schema: buildSchema(`
      type CategoryName {
        lang: String!
        value: String!
      }

      type CategoryImages {
        large: String!
        medium: String!
        small: String!
        thumbnail: String!
      }

      type Category {
        _id: ID!
        categoryCode: String!
        name: [CategoryName!]!
        images: CategoryImages!
      }

      type MaterialName {
        lang: String!
        value: String!
      }

      type Material {
        name: [MaterialName!]!
        available: Boolean!
      }

      type RootQuery {
        categories: [Category!]!
        materials: [Material!]!
      }

      schema {
        query: RootQuery
      
      }
    `),
    rootValue: {
      categories: () => Category.find(),
      materials: () => Material.find(),
    },
    graphiql: true,
  }),
);
app.get('/', (req, res) => res.send('API Running'));

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

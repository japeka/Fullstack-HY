require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const jwt = require("jsonwebtoken");
const book = require("./models/book");

const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", process.env.MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    me: (root, args, context) => {
      return context.currentUser;
    },
    allBooks: async (root, args) => {
      if (!args.author && !args.genre)
        return await Book.find({}).populate("author");
      if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author });
        if (author)
          return await Book.find({ author: author._id }).populate("author");
      }
      if (!args.author && args.genre) {
        let books = await Book.find({}).populate("author");
        books = books.filter((book) => book.genres.includes(args.genre));
        return books;
      }
      if (args.author && args.genre) {
        let author = await Author.findOne({ name: args.author });
        let books = await Book.find({}).populate("author");
        if (author)
          return books.filter(
            (book) =>
              book.author.equals(author._id) && book.genres.includes(args.genre)
          );
      }
      return [];
    },
    allAuthors: async (root, args) => {
      let authors = await Author.find({});
      const books = await Book.find({});
      authors = authors.map((author) => {
        return {
          name: author.name,
          born: author.born,
          bookCount: books.filter((book) => book.author.equals(author._id))
            .length,
        };
      });
      return authors;
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new UserInputError("user was not added succesfully");
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError("token not found");
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError("author was not saved succesfully");
        }
      }

      const book = new Book({
        ...args,
        author: author.id,
      });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError("book was not saved succesfully");
      }
      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError("token not found");
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      try {
        await author.save();
        return author;
      } catch (error) {
        throw new UserInputError(
          "editing author was not performed succesfully"
        );
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

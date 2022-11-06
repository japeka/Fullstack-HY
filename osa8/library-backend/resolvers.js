const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const { UserInputError, AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    me: (root, args, context) => {
      return context.currentUser;
    },
    allBooks: async (root, args) => {
      console.log("args", args);
      if (!args.author && !args.genre) {
        const books = await Book.find({}).populate("author");
        console.log(books);
        return books;
      }
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
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
        throw new AuthenticationError("token not found");
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
        author,
      });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError("book was not saved succesfully");
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: book });
      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("token not found");
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) return null;

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

module.exports = resolvers;

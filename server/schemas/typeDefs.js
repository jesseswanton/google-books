const typeDefs = `
    type Book {
        bookId: String!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }

    type User {
        _id: ID
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: String
        user: User
    }

    type Query {
        me(_id: ID): User
        user: [User]
    }

    input BookInput {
        description: String
        authors: [String]
        title: String
        bookId: String
        image: String
        link: String
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(_id: ID, criteria: BookInput): User
        removeBook(_id: ID, bookId: String!): User
    }
`
module.exports = typeDefs;
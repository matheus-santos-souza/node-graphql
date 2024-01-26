import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from "node:crypto";

/** -------Problemas que GraphQL resolvem---------
* UNDER FETCHING
* Rota HTTP que retornam poucos dados
* 
* OVER FETCHING
* Rota HTTP que retornam muitos dados
*/

interface User {
    id: String,
    name: String
}

const typeDefs = gql`
    type User {
        id: String!
        name: String!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        createUser(name: String!): User!
    }
`
const users: User[] = []
const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            users: () => users
        },

        Mutation: {
            createUser: (_, args) => {
                const newUser = { id: randomUUID(), ...args}
                users.push(newUser);
                return newUser
            }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`HTTP server running at ${url}`)
})
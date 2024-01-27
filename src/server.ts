import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { AppointmentsResolvers } from "./resolvers/appointments-resolvers";
import { CustomersResolvers } from "./resolvers/customers-resolvers";
import path from "node:path";

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [
            CustomersResolvers,
            AppointmentsResolvers,
        ],
        emitSchemaFile: path.resolve('src', 'schema', 'schema.gql'),
        validate: true
    })

    const server = new ApolloServer({
        schema,
    })
   
    const { url } = await server.listen()
    console.log(`🤖 HTTP server running on ${url}`)
}

bootstrap()
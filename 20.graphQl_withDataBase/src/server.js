const { configDotenv } = require("dotenv");
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = require('../src/graphql/schema');
const resolvers = require('../src/graphql/resolvers');
const connectToDB = require("./database/db");


configDotenv("./.env");


async function startServer () {

  await connectToDB();
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server , {
    listen : {port : process.env.PORT || 4000}
  });
  console.log(`��� Server ready at ${url}`);
}

startServer();
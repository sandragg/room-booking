const express = require("express");
const graphqlHTTP = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const {graphql} = require('graphql');

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const router = express.Router();

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

router.use(graphqlHTTP({
    schema,
    graphiql: true,
}));

const query = "query {events {id, title, dateStart, dateEnd, room{id}, users{id, login, avatarUrl, homeFloor}}}";
graphql(schema, query).then((result) => {
    console.log("json>>>>", JSON.stringify(result))
});

router.get("*", () => {console.log("router.get")});

module.exports.router = router;
module.exports.schema = schema;

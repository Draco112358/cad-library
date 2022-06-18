import faunadb from 'faunadb';


export const faunaClient = new faunadb.Client({
    secret: process.env.REACT_APP_FAUNA_DB_KEY as string,
    domain: process.env.REACT_APP_FAUNA_DB_DOMAIN as string,
    port: parseInt(process.env.REACT_APP_FAUNA_DB_PORT as string),
    scheme: 'https',
})

export const faunaQuery = faunadb.query
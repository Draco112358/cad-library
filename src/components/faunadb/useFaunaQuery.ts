import { useAuth0 } from "@auth0/auth0-react"
import faunadb from "faunadb"

export const useFaunaQuery = () => {
    const { getAccessTokenSilently } = useAuth0()

    const execQuery = async (queryFunction: (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, ...params: any) => Promise<any>, ...queryParams: any) => {
        try {
            const token = await getAccessTokenSilently()
            const faunaClient = new faunadb.Client({ secret: token })
            const faunaQuery = faunadb.query
            return queryFunction(faunaClient, faunaQuery, ...queryParams)
        } catch (e) {
            console.log(e)
            return null
        }
    }

    return {execQuery} 

}
import toast from "react-hot-toast";
import faunadb from "faunadb"

export type FaunaCadModel = {
    id?: string,
    name: string,
    components: string,
    owner_id: string,
    owner: string,
    userSharingWith?: string[]
}

type FaunaModelDetails = {
    id: string
    details: FaunaCadModel
}

function faunaModelDetailsToFaunaCadModel(modelDetails: FaunaModelDetails) {
    return {
        id: modelDetails.id,
        ...modelDetails.details
    } as FaunaCadModel
}

export async function saveNewModel(faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, newModel: FaunaCadModel) {
    try {
        await faunaClient.query((
            faunaQuery.Create(
                faunaQuery.Collection('CadModels'),
                {
                    data: {
                        ...newModel
                    }
                }
            )
        ))
        toast.success("Model successfully saved!")
    } catch (e) {
        toast.error("Model not saved! See console log for error details.")
        console.log(e)
    }
}

export const getModelsByOwner = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, owner_id: string) => {
    try {
        const response = await faunaClient.query(
            faunaQuery.Select("data",
                faunaQuery.Map(
                    faunaQuery.Paginate(faunaQuery.Match(faunaQuery.Index("models_by_owner"), owner_id)),
                    faunaQuery.Lambda("model",
                        {
                            id: faunaQuery.Select(
                                ['ref', 'id'],
                                faunaQuery.Get(faunaQuery.Var('model'))),
                            details: faunaQuery.Select("data", faunaQuery.Get(faunaQuery.Var("model")))
                        })
                )
            )
        )
            .catch((err: { name: any; message: any; errors: () => { description: any; }[]; }) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ));
        return (response as FaunaModelDetails[]).map(el => faunaModelDetailsToFaunaCadModel(el))
    } catch (e) {
        console.log(e)
        return {} as [];
    }
}
import toast from "react-hot-toast";
import { ComponentEntity } from "../../model/componentEntity/componentEntity";
import faunadb from "faunadb"

export type FaunaCadModel = {
    name: string,
    components: ComponentEntity[],
    owner_id: string,
    owner: string
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
                    faunaQuery.Lambda("model", faunaQuery.Select("data", faunaQuery.Get(faunaQuery.Var("model"))))
                )
            )
        )
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ));
        return response as FaunaCadModel[]
    }catch (e) {
        console.log(e)
        return {} as [];
    }
}
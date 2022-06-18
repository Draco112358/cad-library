import { useAuth0 } from "@auth0/auth0-react"
import { FC, useEffect, useState } from "react"
import { Col, Row, Modal, Table } from "react-bootstrap"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { ImportActionParamsObject, importCadModelFromDB } from "../../importFunctions/importFunctions"
import { FaunaCadModel, getModelsByOwner } from "../api/modelsAPIs"

export const ImportModelFromDBModal: FC<{ showModalLoad: Function, importActionParams: ImportActionParamsObject, importAction:(params: ImportActionParamsObject) => any }> = ({ showModalLoad, importActionParams, importAction }) => {

    const [models, setModels] = useState<FaunaCadModel[]>([])
    const [selectedModel, setSelectedModel] = useState<FaunaCadModel | undefined>(undefined)
    const [loadingMessage, setLoadingMessage] = useState("Loading...")
    const { user } = useAuth0()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchModels = async (userID: string) => {
            const mods = await getModelsByOwner(userID)
            return mods
        }
        (user !== undefined && user.sub !== undefined) && fetchModels(user.sub).then(mods => {
            setModels(mods);
            (models.length === 0) && setLoadingMessage("No models to load form database.")
        })
    }, [])


    return <Modal show={true}>
        <Modal.Header><Modal.Title>Select model to load</Modal.Title></Modal.Header>
        <Modal.Body>
            {(models.length === 0) ?
                <div>{loadingMessage}</div>
                :
                <Table bordered striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Model name</th>
                            <th>Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {models.map((model) => {
                            return <tr>
                                <td>
                                    <input
                                        key={model.name}
                                        type="radio"
                                        value={model.name}
                                        name="modelSelection"
                                        onChange={() => setSelectedModel(model)}
                                    />
                                </td>
                                <td>{model.name}</td>
                                <td>{model.owner}</td>
                            </tr>
                        })
                        }
                    </tbody>
                </Table>
            }
        </Modal.Body>
        <Modal.Footer>
            <Row>
                <Col>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => { showModalLoad(false) }}
                    >
                        Cancel
                    </button>
                </Col>
                <Col>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={(selectedModel === undefined) ?
                            () => { toast.error("You must select a model to load.") }
                            :
                            () => {
                                importActionParams.canvas.components = selectedModel.components
                                showModalLoad(false)
                                toast.success("Model successfully loaded")
                                importCadModelFromDB(dispatch,importAction,importActionParams)
                            }
                        }
                    >
                        Load
                    </button>
                </Col>
            </Row>
        </Modal.Footer>
    </Modal>
}
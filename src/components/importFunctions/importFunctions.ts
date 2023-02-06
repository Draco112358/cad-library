import { Dispatch } from "@reduxjs/toolkit";
import { getNewKeys } from "../baseShapes/shapes/cube/cube";
import { BufferGeometryAttributes, ComponentEntity, TRANSF_PARAMS_DEFAULTS } from "../model/componentEntity/componentEntity";
import { addComponent, importStateCanvas, CanvasState } from "../store/canvas/canvasSlice";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

//TODO: change importFromCadSTL to make it working in any case, not only for the CAD.
export const importFromCadSTL = (STLFile: File, numberOfGeneratedKey: number, dispatch: Dispatch) => {
    let loader = new STLLoader();

    STLFile.arrayBuffer().then((value) => {
        let res = loader.parse(value);
        let entity: ComponentEntity = {
            type: 'BUFFER',
            name: 'BUFFER',
            keyComponent: getNewKeys(numberOfGeneratedKey, dispatch)[0],
            orbitEnabled: true,
            transformationParams: TRANSF_PARAMS_DEFAULTS,
            previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
            geometryAttributes: {
                positionVertices: Float32Array.from(res.attributes.position.array),
                normalVertices:  Float32Array.from(res.attributes.normal.array),
                uvVertices: undefined
            } as BufferGeometryAttributes,
            transparency: true,
            opacity: 1
        }

        dispatch(addComponent(entity))
    })
}

export const importFromCadProject = (file: File, dispatch: Dispatch, action: (params: ImportActionParamsObject) => any, actionParamsObject: ImportActionParamsObject) => {
    file.text().then((value) => {
        actionParamsObject.canvas = JSON.parse(value)
        dispatch(action(actionParamsObject))
    })
}

export const importCadModelFromDB = (dispatch: Dispatch, action: (params: ImportActionParamsObject) => any, actionParamsObject: ImportActionParamsObject) => {
    dispatch(action(actionParamsObject))
}

export type ImportActionParamsObject = {
    canvas: CanvasState,
    id: string | undefined
}
import { Dispatch } from "@reduxjs/toolkit";
import { getNewKeys } from "../baseShapes/shapes/cube/cube";
import { BufferEntity, TRANSF_PARAMS_DEFAULTS } from "../model/componentEntity/componentEntity";
import { addComponent, importStateCanvas, CanvasState } from "../store/canvas/canvasSlice";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";

//TODO: change importFromCadSTL to make it working in any case, not only for the CAD.
export const importFromCadSTL = (STLFile: File, numberOfGeneratedKey: number, dispatch: Dispatch) => {
    let loader = new STLLoader();

    STLFile.arrayBuffer().then((value) => {
        let res = loader.parse(value);
        let entity: BufferEntity = {
            type: 'BUFFER',
            name: 'BUFFER',
            keyComponent: getNewKeys(numberOfGeneratedKey, dispatch)[0],
            orbitEnabled: true,
            transformationParams: TRANSF_PARAMS_DEFAULTS,
            color: '#ec2626',
            previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
            positionVertices: res.attributes.position.array as Float32Array,
            normalVertices: res.attributes.normal.array as Float32Array,
            uvVertices: undefined
        }

        dispatch(addComponent(entity))
    })
}

export const importFromCadProject = (file: File, dispatch: Dispatch, action: (params: ImportActionParamsObject) => any , actionParamsObject: ImportActionParamsObject) => {
    file.text().then((value) => {
        actionParamsObject.canvas = JSON.parse(value)
        dispatch(action(actionParamsObject))
    })
}

export type ImportActionParamsObject = {
    canvas: CanvasState,
    id: string | undefined
}
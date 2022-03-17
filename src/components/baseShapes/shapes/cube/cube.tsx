import { Dispatch } from "@reduxjs/toolkit";
import { FC, } from "react";
import "@react-three/fiber"
import { incrementNumberOfGeneratedKey } from "../../../store/canvas/canvasSlice";
import { ComponentEntity, CubeGeometryAttributes, TRANSF_PARAMS_DEFAULTS } from "../../../model/componentEntity/componentEntity";

interface CubeProps {
    color: string,
    width: number,
    height: number,
    depth: number,
    widthSegments?: number,
    heigthSegments?: number,
    depthSegments?: number
}

export function getNewKeys(numberOfGeneratedKey: number, dispatch: Dispatch, numberOfKeyToGenerate = 1) {
    let lastKey = numberOfGeneratedKey
    let newKeys: number[] = []
    for (let i = 1; i <= numberOfKeyToGenerate; i++) {
        newKeys.push(lastKey + i)
    }
    dispatch(incrementNumberOfGeneratedKey(numberOfKeyToGenerate))
    return newKeys;
}


export function getDefaultCube(numberOfGeneratedKey: number, dispatch: Dispatch) {
    const component: ComponentEntity = {
        type: 'CUBE',
        name: 'CUBE',
        keyComponent: getNewKeys(numberOfGeneratedKey, dispatch)[0],
        orbitEnabled: true,
        transformationParams: TRANSF_PARAMS_DEFAULTS,
        previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
        geometryAttributes: {
            width: 1,
            depth: 1,
            height: 1,
            depthSegments: 1,
            heigthSegments: 1,
            widthSegments: 1
        } as CubeGeometryAttributes

    }
    return component
}

export const Cube: FC<CubeProps> = (
    { width, height, depth, color, depthSegments, widthSegments, heigthSegments}
) => {
    return (
        <>
            <boxGeometry args={[width, height, depth, widthSegments, heigthSegments, depthSegments]} />
            <meshPhongMaterial color={color} />
        </>
    )
}
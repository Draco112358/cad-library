import { ComponentTypes } from "../auxiliaryTypes"


export type TransformationParamDetails = [number, number, number]

export type TransformationParams = {
    position: TransformationParamDetails
    rotation: TransformationParamDetails
    scale: TransformationParamDetails
}

export const TRANSF_PARAMS_DEFAULTS : TransformationParams = {
    position: [0,0,0],
    rotation: [0,0,0],
    scale: [1,1,1]
}

export const areEquals = (firstTransfParams: TransformationParams, secondTransfParams: TransformationParams) => {
    if (firstTransfParams.position.every((val, index) => val === secondTransfParams.position[index])
        && firstTransfParams.scale.every((val, index) => val === secondTransfParams.scale[index])
        && firstTransfParams.rotation.every((val, index) => val === secondTransfParams.rotation[index])) {
        return true
    }
    return false
}

export type ComponentEntity = {
    name: string
    type: ComponentTypes
    orbitEnabled: boolean
    transformationParams: TransformationParams
    previousTransformationParams: TransformationParams
    color: string
    keyComponent: number
}

export type CubeEntity = {
    width: number,
    depth: number,
    height: number,
    widthSegments?: number,
    heigthSegments?: number,
    depthSegments?: number
} & ComponentEntity


export type SphereEntity = {
    radius: number,
    widthSegments: number,
    heightSegments: number,
    phiStart?: number,
    phiLength?: number,
    thetaStart?: number,
    thetaLength?: number
} & ComponentEntity

export type CompositeEntity = {
    baseElements: { elementA: ComponentEntity, elementB: ComponentEntity }
} & ComponentEntity

export type BufferEntity = {
    positionVertices: Float32Array
    normalVertices: Float32Array
    uvVertices: Float32Array | undefined
} & ComponentEntity

export type CylinderEntity = {
    topRadius: number,
    bottomRadius: number,
    height: number,
    radialSegments?: number,
    heightSegments?: number,
    openEnded?: boolean,
    thetaLength?: number,
    thetaStart?: number
} & ComponentEntity

export type TorusEntity = {
    torusRadius: number,
    tubeRadius: number,
    radialSegments?: number,
    tubularSegments?: number,
    centralAngle?: number,
} & ComponentEntity

export type ConeEntity = {
    radius: number,
    height: number,
    radialSegments?: number,
    heightSegments?: number,
    openEnded?: boolean,
    thetaLength?: number,
    thetaStart?: number
} & ComponentEntity
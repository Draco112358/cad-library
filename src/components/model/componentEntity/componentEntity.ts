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
    material?: Material,
    keyComponent: number, 
    geometryAttributes: GeometryAttributes,
    previousGeometryAttributes?: GeometryAttributes
}

export type Material = {
    name: string,
    color: string,
    permeability: number,
    tangent_delta_permeability?: number,
    custom_permeability?: [number, number],
    permittivity: number,
    tangent_delta_permittivity?: number,
    custom_permittivity?: [number, number],
    conductivity: number,
    tangent_delta_conductivity?: number,
    custom_conductivity?: [number, number]
    associatedComponentKey: number[]
}

export type GeometryAttributes = {}

export type CubeGeometryAttributes = {
    width: number,
    depth: number,
    height: number,
    widthSegments?: number,
    heigthSegments?: number,
    depthSegments?: number
} & GeometryAttributes

export type CircleGeometryAttributes = {
    radius: number,
    segments?: number,
    thetaStart?: number,
    thetaLength?: number
} & GeometryAttributes


export type SphereGeometryAttributes = {
    radius: number,
    widthSegments: number,
    heightSegments: number,
    phiStart?: number,
    phiLength?: number,
    thetaStart?: number,
    thetaLength?: number
} & GeometryAttributes

export type CompositeEntity = {
    baseElements: { elementA: ComponentEntity, elementB: ComponentEntity }
} & ComponentEntity

export type BufferGeometryAttributes = {
    positionVertices: Float32Array
    normalVertices: Float32Array
    uvVertices: Float32Array | undefined
} & GeometryAttributes

export type CylinderGeometryAttributes = {
    topRadius: number,
    bottomRadius: number,
    height: number,
    radialSegments?: number,
    heightSegments?: number,
    openEnded?: boolean,
    thetaLength?: number,
    thetaStart?: number
} & GeometryAttributes

export type TorusGeometryAttributes = {
    torusRadius: number,
    tubeRadius: number,
    radialSegments?: number,
    tubularSegments?: number,
    centralAngle?: number,
} & GeometryAttributes

export type ConeGeometryAttributes = {
    radius: number,
    height: number,
    radialSegments?: number,
    heightSegments?: number,
    openEnded?: boolean,
    thetaLength?: number,
    thetaStart?: number
} & GeometryAttributes
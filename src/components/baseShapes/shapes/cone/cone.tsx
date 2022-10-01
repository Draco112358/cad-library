import { Dispatch } from "@reduxjs/toolkit";
import { FC } from "react";
import { ComponentEntity, ConeGeometryAttributes, TRANSF_PARAMS_DEFAULTS } from "../../../model/componentEntity/componentEntity";
import { getNewKeys } from "../cube/cube";

interface ConeProps {
    radius: number,
    height: number,
    radialSegments?: number,
    heightSegments?: number,
    openEnded?: boolean,
    thetaLength?: number,
    thetaStart?: number,
    color: string,
    opacity: number, 
    transparency: boolean
}

export function getDefaultCone(numberOfGeneratedKey: number, dispatch: Dispatch) {
    const component: ComponentEntity = {
        type: 'CONE',
        name: 'CONE',
        keyComponent: getNewKeys(numberOfGeneratedKey, dispatch)[0],
        orbitEnabled: true,
        transformationParams: TRANSF_PARAMS_DEFAULTS,
        previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
        geometryAttributes: {
            height: 1,
            radius: 1,
            radialSegments: 20,
            heightSegments: 1,
            openEnded: false,
            thetaLength: Math.PI * 2,
            thetaStart: 0
        } as ConeGeometryAttributes,
        transparency: true,
        opacity: 1
    }
    return component
}


export const Cone: FC<ConeProps> = (
    { radius, height, radialSegments, heightSegments, openEnded, thetaLength, thetaStart, color, opacity, transparency}
) => {

    return (
        <>
            <coneGeometry args={[radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength]} />
            <meshPhongMaterial color={color} opacity={opacity} transparent={transparency}/>
        </>
    )
}
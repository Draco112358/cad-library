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
    color: string
}

export function getDefaultCone(numberOfGeneratedKey: number, dispatch: Dispatch) {
    const component: ComponentEntity = {
        type: 'CONE',
        name: 'CONE',
        keyComponent: getNewKeys(numberOfGeneratedKey, dispatch)[0],
        orbitEnabled: true,
        transformationParams: TRANSF_PARAMS_DEFAULTS,
        color: getComputedStyle(document.documentElement).getPropertyValue('--coneColor').replace(' ', ''),
        previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
        geometryAttributes: {
            height: 1,
            radius: 1,
            radialSegments: 20,
            heightSegments: 1,
            openEnded: false,
            thetaLength: Math.PI * 2,
            thetaStart: 0
        } as ConeGeometryAttributes
    }
    return component
}


export const Cone: FC<ConeProps> = (
    { radius, height, radialSegments, heightSegments, openEnded, thetaLength, thetaStart, color }
) => {

    return (
        <>
            <coneGeometry args={[radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength]} />
            <meshPhongMaterial color={color} />
        </>
    )
}
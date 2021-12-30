import { Dispatch } from "@reduxjs/toolkit";
import { FC } from "react";
import {TRANSF_PARAMS_DEFAULTS, getNewKeys, ConeEntity} from "../../.."

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
    const component: ConeEntity = {
        type: 'CONE',
        name: 'CONE',
        keyComponent: getNewKeys(numberOfGeneratedKey, dispatch)[0],
        orbitEnabled: true,
        transformationParams: TRANSF_PARAMS_DEFAULTS,
        height: 1,
        color: getComputedStyle(document.documentElement).getPropertyValue('--coneColor').replace(' ', ''),
        previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
        radius: 1,
        radialSegments: 20
    }
    return component
}


export const Cone: FC<ConeProps> = (
    { radius, height, radialSegments, heightSegments, openEnded, thetaLength, thetaStart, color}
) => {

    return (
        <>
            <coneGeometry args={[radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength]} />
            <meshPhongMaterial color={color} />
        </>
    )
}
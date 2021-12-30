import { Dispatch } from "@reduxjs/toolkit";
import { FC } from "react";
import { getNewKeys, TorusEntity, TRANSF_PARAMS_DEFAULTS } from "../../..";

interface TorusProps {
    torusRadius: number,
    tubeRadius: number,
    radialSegments?: number,
    tubularSegments?: number,
    centralAngle?: number, 
    color: string
}

export function getDefaultTorus(numberOfGeneratedKey: number, dispatch: Dispatch) {
    const component: TorusEntity = {
        type: 'TORUS',
        name: 'TORUS',
        keyComponent: getNewKeys(numberOfGeneratedKey, dispatch)[0],
        orbitEnabled: true,
        transformationParams: TRANSF_PARAMS_DEFAULTS,
        color: getComputedStyle(document.documentElement).getPropertyValue('--torusColor').replace(' ', ''),
        previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
        tubularSegments: 20,
        torusRadius: 2,
        tubeRadius: 0.4
    }
    return component
}

export const Torus: FC<TorusProps> = ({torusRadius, tubeRadius, radialSegments, tubularSegments, centralAngle, color}) => {

    return (
        <>
            <torusGeometry args={[torusRadius, tubeRadius, radialSegments, tubularSegments, centralAngle]}/>
            <meshPhongMaterial color={color} />
        </>
    )
}
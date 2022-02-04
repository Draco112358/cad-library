import { Dispatch } from "@reduxjs/toolkit";
import { FC } from "react";
import { ComponentEntity, TorusGeometryAttributes, TRANSF_PARAMS_DEFAULTS } from "../../../model/componentEntity/componentEntity";
import { getNewKeys } from "../cube/cube";

interface TorusProps {
    torusRadius: number,
    tubeRadius: number,
    radialSegments?: number,
    tubularSegments?: number,
    centralAngle?: number,
    color: string
}

export function getDefaultTorus(numberOfGeneratedKey: number, dispatch: Dispatch) {
    const component: ComponentEntity = {
        type: 'TORUS',
        name: 'TORUS',
        keyComponent: getNewKeys(numberOfGeneratedKey, dispatch)[0],
        orbitEnabled: true,
        transformationParams: TRANSF_PARAMS_DEFAULTS,
        previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
        geometryAttributes: {
        tubularSegments: 20,
        torusRadius: 2,
        tubeRadius: 0.4,
        radialSegments: 8,
        centralAngle: Math.PI*2} as TorusGeometryAttributes
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

//getComputedStyle(document.documentElement).getPropertyValue('--torusColor').replace(' ', '')
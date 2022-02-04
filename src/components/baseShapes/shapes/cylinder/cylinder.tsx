import { Dispatch } from "@reduxjs/toolkit";
import { FC } from "react";
import { ComponentEntity, CylinderGeometryAttributes, TRANSF_PARAMS_DEFAULTS } from "../../../model/componentEntity/componentEntity";
import { getNewKeys } from "../cube/cube";

interface CylinderProps {
    topRadius: number,
    bottomRadius: number,
    height: number,
    radialSegments?: number,
    heightSegments?: number,
    openEnded?: boolean,
    thetaLength?: number,
    thetaStart?: number,
    color: string
}

export function getDefaultCylinder(numberOfGeneratedKey: number, dispatch: Dispatch) {
    const component: ComponentEntity = {
        type: 'CYLINDER',
        name: 'CYLINDER',
        keyComponent: getNewKeys(numberOfGeneratedKey, dispatch)[0],
        orbitEnabled: true,
        transformationParams: TRANSF_PARAMS_DEFAULTS,
        previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
        geometryAttributes: {
            height: 1,
            topRadius: 1,
            bottomRadius: 1,
            radialSegments: 20,
            heightSegments: 1,
            openEnded: false,
            thetaStart: 0,
            thetaLength: Math.PI * 2
        } as CylinderGeometryAttributes
    }
    return component
}


export const Cylinder: FC<CylinderProps> = (
    { topRadius, bottomRadius, height, radialSegments, heightSegments, openEnded, thetaLength, thetaStart, color }
) => {

    return (
        <>
            <cylinderGeometry args={[topRadius, bottomRadius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength]} />
            <meshPhongMaterial color={color} />
        </>
    )
}
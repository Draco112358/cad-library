import { Dispatch } from '@reduxjs/toolkit';
import { FC } from 'react';
import { CircleGeometryAttributes, ComponentEntity, SphereGeometryAttributes, TRANSF_PARAMS_DEFAULTS } from '../../../model/componentEntity/componentEntity';
import { getNewKeys } from '../cube/cube';

interface CircleProps {
    radius: number,
    segments?: number,
    color: string,
    thetaStart?: number,
    thetaLength?: number,
    opacity: number, 
    transparency: boolean
}

export function getDefaultCircle(numberOfGeneratedKey: number, dispatch: Dispatch) {
    const component: ComponentEntity = {
        type: 'CIRCLE',
        name: 'CIRCLE',
        keyComponent: getNewKeys(numberOfGeneratedKey, dispatch)[0],
        orbitEnabled: true,
        transformationParams: TRANSF_PARAMS_DEFAULTS,
        previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
        geometryAttributes: {
            radius: 1,
            segments: 20,
            thetaStart: 0,
            thetaLength: Math.PI
        } as CircleGeometryAttributes,
        transparency: true,
        opacity: 1

    }
    return component
}

export const Circle: FC<CircleProps> = ({ radius, segments, color, thetaLength, thetaStart, opacity , transparency}) => {
    return (
        <>
            <circleGeometry args={[radius, segments, thetaStart, thetaLength]} />
            <meshPhongMaterial color={color} opacity={opacity} transparent={transparency}/>
        </>
    )
}
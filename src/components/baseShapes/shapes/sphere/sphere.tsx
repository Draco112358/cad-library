import { Dispatch } from '@reduxjs/toolkit';
import { FC } from 'react';
import { SphereEntity, TRANSF_PARAMS_DEFAULTS } from '../../../model/componentEntity/componentEntity';
import { getNewKeys } from '../cube/cube';

interface SphereProps {
    radius: number,
    widthSegments: number,
    heightSegments: number,
    color: string,
    phiStart?: number,
    phiLength?: number,
    thetaStart?: number,
    thetaLength?: number
}

export function getDefaultSphere(numberOfGeneratedKey: number, dispatch: Dispatch) {
    const component: SphereEntity = {
        type: 'SPHERE',
        name: 'SPHERE',
        keyComponent: getNewKeys(numberOfGeneratedKey, dispatch)[0],
        orbitEnabled: true,
        transformationParams: TRANSF_PARAMS_DEFAULTS,
        radius: 1,
        widthSegments: 20,
        heightSegments: 20,
        phiStart: 0,
        thetaStart: 0,
        phiLength: Math.PI*2,
        thetaLength: Math.PI,
        color: getComputedStyle(document.documentElement).getPropertyValue('--sphereColor').replace(' ', ''),
        previousTransformationParams: TRANSF_PARAMS_DEFAULTS

    }
    return component
}

export const Sphere: FC<SphereProps> = ({ radius, widthSegments, heightSegments, color }) => {
    return (
        <>
            <sphereGeometry args={[radius, widthSegments, heightSegments]} />
            <meshPhongMaterial color={color} />
        </>
    )
}
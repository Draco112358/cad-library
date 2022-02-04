import React, { FC } from "react"
import { DefaultColorShapes } from "../model/auxiliaryTypes/auxiliaryTypes"
import { BufferGeometryAttributes, ComponentEntity, CompositeEntity, ConeGeometryAttributes, CubeGeometryAttributes, CylinderGeometryAttributes, SphereGeometryAttributes, TorusGeometryAttributes } from "../model/componentEntity/componentEntity"
import { BufferComponent } from "./shapes/bufferComponent/bufferComponent"
import { Composite } from "./shapes/composite/composite"
import { Cone } from "./shapes/cone/cone"
import { Cube } from "./shapes/cube/cube"
import { Cylinder } from "./shapes/cylinder/cylinder"
import { Sphere } from "./shapes/sphere/sphere"
import { Torus } from "./shapes/torus/torus"


interface FactoryShapesProps{
    entity: ComponentEntity
}

export const FactoryShapes: FC<FactoryShapesProps> = ({entity}) => {
    switch (entity.type) {
        case "CUBE":
            let cubeGeometryAttributes = entity.geometryAttributes as CubeGeometryAttributes
            return <Cube color={(entity.material != undefined) ? entity.material.color : DefaultColorShapes.cubeColor} width={cubeGeometryAttributes.width} height={cubeGeometryAttributes.height}
                         depth={cubeGeometryAttributes.depth} widthSegments={cubeGeometryAttributes.widthSegments} heigthSegments={cubeGeometryAttributes.heigthSegments} depthSegments={cubeGeometryAttributes.depthSegments}/>
        case "SPHERE":
            let sphereGeometryAttributes = entity.geometryAttributes as SphereGeometryAttributes
            return <Sphere color={(entity.material != undefined) ? entity.material.color : DefaultColorShapes.sphereColor} heightSegments={sphereGeometryAttributes.heightSegments}
                           widthSegments={sphereGeometryAttributes.widthSegments} radius={sphereGeometryAttributes.radius} 
                           phiStart={sphereGeometryAttributes.phiStart} phiLength={sphereGeometryAttributes.phiLength} thetaStart={sphereGeometryAttributes.thetaStart} thetaLength={sphereGeometryAttributes.thetaLength}/>
        case "BUFFER":
            let bufferGeometryAttributes = entity.geometryAttributes as BufferGeometryAttributes
            return <BufferComponent positionVertices={bufferGeometryAttributes.positionVertices} normalVertices={bufferGeometryAttributes.normalVertices} color={(entity.material != undefined) ? entity.material.color : DefaultColorShapes.bufferColor}/>
        case "CYLINDER":
            let cylinderGeometryAttributes = entity.geometryAttributes as CylinderGeometryAttributes
            return <Cylinder topRadius={cylinderGeometryAttributes.topRadius} bottomRadius={cylinderGeometryAttributes.bottomRadius}
                             height={cylinderGeometryAttributes.height}
                             color={(entity.material != undefined) ? entity.material.color : DefaultColorShapes.cylinderColor} heightSegments={cylinderGeometryAttributes.heightSegments}
                             radialSegments={cylinderGeometryAttributes.radialSegments}
                             thetaStart={cylinderGeometryAttributes.thetaStart} thetaLength={cylinderGeometryAttributes.thetaLength}
                             openEnded={cylinderGeometryAttributes.openEnded}/>
        case "TORUS":
            let torusGeometryAttributes = entity.geometryAttributes as TorusGeometryAttributes
            return <Torus color={(entity.material != undefined) ? entity.material.color : DefaultColorShapes.torusColor} torusRadius={torusGeometryAttributes.torusRadius}
                          tubeRadius={torusGeometryAttributes.tubeRadius}
                          centralAngle={torusGeometryAttributes.centralAngle} radialSegments={torusGeometryAttributes.radialSegments}
                          tubularSegments={torusGeometryAttributes.tubularSegments}/>
        case "CONE":
            let coneGeometryAttributes = entity.geometryAttributes as ConeGeometryAttributes
            return <Cone radius={coneGeometryAttributes.radius} height={coneGeometryAttributes.height}
                         color={(entity.material != undefined) ? entity.material.color : DefaultColorShapes.coneColor} heightSegments={coneGeometryAttributes.heightSegments}
                         radialSegments={coneGeometryAttributes.radialSegments}
                         thetaStart={coneGeometryAttributes.thetaStart} thetaLength={coneGeometryAttributes.thetaLength}
                         openEnded={coneGeometryAttributes.openEnded}/>
        default:
            return <Composite entity={entity as CompositeEntity} color={(entity.material != undefined)? entity.material.color : DefaultColorShapes.compositeColor}/>

    }
}
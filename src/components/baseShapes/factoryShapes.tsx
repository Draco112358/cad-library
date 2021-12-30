import React, { FC } from "react"
import { BufferComponent, BufferEntity, ComponentEntity, Composite, CompositeEntity, Cone, ConeEntity, Cube, CubeEntity, Cylinder, CylinderEntity, Sphere, SphereEntity, Torus, TorusEntity } from "../.."

interface FactoryShapesProps{
    entity: ComponentEntity
}

export const FactoryShapes: FC<FactoryShapesProps> = ({entity}) => {
    switch (entity.type) {
        case "CUBE":
            let cubeEntity = entity as CubeEntity
            return <Cube color={cubeEntity.color} width={cubeEntity.width} height={cubeEntity.height}
                         depth={cubeEntity.depth}/>
        case "SPHERE":
            let sphereEntity = entity as SphereEntity
            return <Sphere color={sphereEntity.color} heightSegments={sphereEntity.heightSegments}
                           widthSegments={sphereEntity.widthSegments} radius={sphereEntity.radius}/>
        case "BUFFER":
            let bufferEntity = entity as BufferEntity
            return <BufferComponent positionVertices={bufferEntity.positionVertices} normalVertices={bufferEntity.normalVertices} color={bufferEntity.color}/>
        case "CYLINDER":
            let cylinderEntity = entity as CylinderEntity
            return <Cylinder topRadius={cylinderEntity.topRadius} bottomRadius={cylinderEntity.bottomRadius}
                             height={cylinderEntity.height}
                             color={cylinderEntity.color} heightSegments={cylinderEntity.heightSegments}
                             radialSegments={cylinderEntity.radialSegments}
                             thetaStart={cylinderEntity.thetaStart} thetaLength={cylinderEntity.thetaLength}
                             openEnded={cylinderEntity.openEnded}/>
        case "TORUS":
            let torusEntity = entity as TorusEntity
            return <Torus color={torusEntity.color} torusRadius={torusEntity.torusRadius}
                          tubeRadius={torusEntity.tubeRadius}
                          centralAngle={torusEntity.centralAngle} radialSegments={torusEntity.radialSegments}
                          tubularSegments={torusEntity.tubularSegments}/>
        case "CONE":
            let coneEntity = entity as ConeEntity
            return <Cone radius={coneEntity.radius} height={coneEntity.height}
                         color={coneEntity.color} heightSegments={coneEntity.heightSegments}
                         radialSegments={coneEntity.radialSegments}
                         thetaStart={coneEntity.thetaStart} thetaLength={coneEntity.thetaLength}
                         openEnded={coneEntity.openEnded}/>
        default:
            return <Composite entity={entity as CompositeEntity}/>

    }
}
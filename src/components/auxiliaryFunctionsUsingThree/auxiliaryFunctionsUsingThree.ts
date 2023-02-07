import * as THREE from "three"
import { CSG } from "three-csg-ts"
import { BufferGeometryAttributes, ComponentEntity, CompositeEntity, ConeGeometryAttributes, CubeGeometryAttributes, CylinderGeometryAttributes, SphereGeometryAttributes, TorusGeometryAttributes, TransformationParams, TRANSF_PARAMS_DEFAULTS } from "../model/componentEntity/componentEntity"


export const meshWithcomputedGeometryBoundingFrom = (mesh: THREE.Mesh) => {
    let meshCopy = mesh.clone()
    meshCopy.geometry = mesh.geometry.clone()
    meshCopy.updateMatrix()
    meshCopy.geometry.computeBoundingBox()
    meshCopy.geometry.boundingBox?.applyMatrix4(meshCopy.matrix)
    return meshCopy
}

export const meshWithColorFromOldOne = (oldMesh: THREE.Mesh, newColor: string) => {
    let newMesh = oldMesh.clone(true);
    (newMesh.material as THREE.MeshPhongMaterial).color.set(newColor)
    return newMesh
}

export const meshWithResetTransformationParamsFromOld = (mesh: THREE.Mesh) => {
    return meshWithPositionRotationScaleFromPreviousOne(mesh, TRANSF_PARAMS_DEFAULTS)
}

export const meshWithPositionRotationScaleFromPreviousOne = (oldMesh: THREE.Mesh, transformationParams: TransformationParams) => {
    let mesh = oldMesh.clone(true)
    mesh.position.set(...transformationParams.position)
    mesh.scale.set(...transformationParams.scale)
    mesh.rotation.set(...transformationParams.rotation)
    mesh.updateMatrix()
    return mesh
}

export const meshFrom = (entity: ComponentEntity) => {
    let newMesh = new THREE.Mesh(geometryFrom(entity), materialPhongFrom(entity))
    let meshResult = meshWithPositionRotationScaleFromPreviousOne(newMesh, entity.transformationParams)
    return meshResult
}

const materialPhongFrom = (entity: ComponentEntity) => {
    let material = new THREE.MeshPhongMaterial();
    (entity.material != undefined) && material.color.set(entity.material.color)
    return material
}

const geometryFrom = (entity: ComponentEntity) => {
    switch (entity.type) {
        case "CUBE":
            let cubeGeometryAttributes = entity.geometryAttributes as CubeGeometryAttributes
            return new THREE.BoxGeometry(cubeGeometryAttributes.width, cubeGeometryAttributes.height, cubeGeometryAttributes.depth, cubeGeometryAttributes.widthSegments, cubeGeometryAttributes.heigthSegments, cubeGeometryAttributes.depthSegments)
        case "SPHERE":
            let sphereGeometryAttributes = entity.geometryAttributes as SphereGeometryAttributes
            return new THREE.SphereGeometry(sphereGeometryAttributes.radius, sphereGeometryAttributes.widthSegments,
                sphereGeometryAttributes.heightSegments, sphereGeometryAttributes.phiStart, sphereGeometryAttributes.phiLength,
                sphereGeometryAttributes.thetaStart, sphereGeometryAttributes.thetaLength)
        case "BUFFER":
            let positionVertices = new Float32Array(Object.values((entity.geometryAttributes as any).positionVertices))
            let normalVertices = new Float32Array(Object.values((entity.geometryAttributes as any).normalVertices))
            let bufferGeometryAttributes: BufferGeometryAttributes = {
            positionVertices: positionVertices,
            normalVertices: normalVertices,
            uvVertices: undefined
          }
            let geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(bufferGeometryAttributes.positionVertices, 3))
            geometry.setAttribute('normal', new THREE.BufferAttribute(bufferGeometryAttributes.normalVertices, 3))
            return geometry
        case "CYLINDER":
            let cylinderGeometryAttributes = entity.geometryAttributes as CylinderGeometryAttributes
            return new THREE.CylinderGeometry(cylinderGeometryAttributes.topRadius, cylinderGeometryAttributes.bottomRadius, cylinderGeometryAttributes.height, 
                cylinderGeometryAttributes.radialSegments, cylinderGeometryAttributes.heightSegments, cylinderGeometryAttributes.openEnded, 
                cylinderGeometryAttributes.thetaStart, cylinderGeometryAttributes.thetaLength)
        case "TORUS":
            let torusGeometryAttributes = entity.geometryAttributes as TorusGeometryAttributes
            return new THREE.TorusGeometry(torusGeometryAttributes.torusRadius, torusGeometryAttributes.tubeRadius,
                torusGeometryAttributes.radialSegments, torusGeometryAttributes.tubularSegments, torusGeometryAttributes.centralAngle)
        case "CONE":
            let coneGeometryAttributes = entity.geometryAttributes as ConeGeometryAttributes
            return new THREE.ConeGeometry(coneGeometryAttributes.radius, coneGeometryAttributes.height, coneGeometryAttributes.radialSegments,
                coneGeometryAttributes.heightSegments, coneGeometryAttributes.openEnded, coneGeometryAttributes.thetaStart, coneGeometryAttributes.thetaLength)
        default:
            let compositeEntity = entity as CompositeEntity
            let [elementA, elementB] = [meshFrom(compositeEntity.baseElements.elementA), meshFrom(compositeEntity.baseElements.elementB)]
            return meshFromOperationBetweenTwoMeshes(entity.type, elementA, elementB).geometry
    }
}

const meshFromOperationBetweenTwoMeshes = (operation: string, firstMesh: THREE.Mesh, secondMesh: THREE.Mesh) => {
    if (operation === "UNION") { return CSG.union(firstMesh, secondMesh) }
    else if (operation === "INTERSECTION") { return CSG.intersect(firstMesh, secondMesh) }
    else { return CSG.subtract(firstMesh, secondMesh) }
}

export const transformationParamsOf = (mesh: THREE.Mesh) => {
    return {
        position: [mesh.position.x, mesh.position.y, mesh.position.z],
        rotation: [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z],
        scale: [mesh.scale.x, mesh.scale.y, mesh.scale.z]
    } as TransformationParams
}

export const thereIsCollisionBetweenMeshes = (firstMesh: THREE.Mesh, secondMesh: THREE.Mesh) => {
    let mesh2 = meshWithcomputedGeometryBoundingFrom(secondMesh);
    let mesh1 = meshWithcomputedGeometryBoundingFrom(firstMesh)
    return (mesh1.geometry.boundingBox && mesh2.geometry.boundingBox)
        ? mesh1.geometry.boundingBox.intersectsBox(mesh2.geometry.boundingBox)
        : false

}

export const getObjectsFromSceneByType = (scene: THREE.Scene, type: string) => scene.children.filter(obj => obj.type === type)

export const meshesCollidingWithTargetMeshBasedOnBoundingBox = (targetMesh: THREE.Mesh, meshesToCheckCollisionWith: THREE.Mesh[]): THREE.Mesh[] => {
    return meshesToCheckCollisionWith
        .reduce((results: THREE.Mesh[], mesh) => {
            (thereIsCollisionBetweenMeshes(targetMesh, mesh)) && results.push(mesh)
            return results
        }, [])
}


export const meshesCollidingWithTargetMesh = (targetMesh: THREE.Mesh, meshesToCheckCollisionWith: THREE.Mesh[]): THREE.Mesh[] => {
    let meshesToCheckCopy = [...meshesToCheckCollisionWith]
    let directionVector = new THREE.Vector3()
    let collisions: THREE.Mesh[] = [];
    for (let index = 0; index < targetMesh.geometry.getAttribute("position").count; index++) {
        directionVector.fromBufferAttribute(targetMesh.geometry.getAttribute("position"), index).applyMatrix4(targetMesh.matrix).sub(targetMesh.position)
        let ray = new THREE.Raycaster(targetMesh.position.clone(), directionVector.clone().normalize())
        let collisionResults = ray.intersectObjects(meshesToCheckCopy)
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
            collisions.push(collisionResults[0].object as THREE.Mesh)
            meshesToCheckCopy = meshesToCheckCopy.filter(mesh => mesh.name !== collisionResults[0].object.name)
        }
    }
    return collisions
}
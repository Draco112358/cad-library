import { useThree } from "@react-three/fiber";
import { useState } from "react";
import { Camera, Raycaster, Scene, Vector2, Vector3 } from "three";
import { getObjectsFromSceneByType } from "../auxiliaryFunctionsUsingThree/auxiliaryFunctionsUsingThree";

export const usePointerIntersectionOnMeshSurface = () => {
    const getPointerCoordsOnMeshSurface = (pointerCoords: Vector2, scene: Scene, camera: Camera) => {
        let raycaster = new Raycaster();
        raycaster.setFromCamera(pointerCoords, camera)
        let intersects = raycaster.intersectObjects(getObjectsFromSceneByType(scene, "Mesh"));
        if (intersects.length > 0) {
            let point = {
                coordinates: intersects[0].point.clone(),
                normalVector: intersects[0].face?.normal.clone() as Vector3
            }
            return point
        }
        return undefined
    }
    const [pointerCoordinates, setPointerCoordinates] = useState<Vector3|undefined>(undefined)
    const [normalVector, setNormalVector] = useState<Vector3|undefined>(undefined)
    const state = useThree()
    const setPointerIntersectionData = (event: MouseEvent) => {
        let pointerCoords = new Vector2((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1)
        let point = getPointerCoordsOnMeshSurface(pointerCoords, state.scene, state.camera)
        if(point){
            setPointerCoordinates(point.coordinates)
            setNormalVector(point.normalVector)
        }
    }
    return {pointerCoordinates, normalVector, setPointerIntersectionData}
}
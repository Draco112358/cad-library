import {STLExporter} from "three/examples/jsm/exporters/STLExporter";
import { meshFrom } from "../auxiliaryFunctionsUsingThree/auxiliaryFunctionsUsingThree";
import { ComponentEntity } from "../model";
import * as THREE from "three";

export const exportToSTL = (components: ComponentEntity[]) : string => {
    let exporter = new STLExporter();
    let scene = new THREE.Scene()
    components.forEach(c => {
        scene.add(meshFrom(c))
        scene.updateWorldMatrix(true, true)
    })
    const re = new RegExp('exported', 'g')
    let STLToPush  = exporter.parse(scene).replace(re, components[0].material?.name as string)
    return STLToPush
}
export type BinaryOperationType = "UNION" | "INTERSECTION" | "SUBTRACTION" 

export type ComponentTypes = "BUFFER" | "CONE" | "CUBE" | "CYLINDER" | "SPHERE" | "TORUS" | "CIRCLE" | BinaryOperationType

export const DefaultColorShapes = {
    cubeColor: "#420202",
    sphereColor: "#6b5d10",
    torusColor: "#06065e",
    cylinderColor: "#5e3507",
    coneColor: "#065c06",
    bufferColor: "#065c06",
    compositeColor: "#065c06",
    circleColor: "#420202"

}
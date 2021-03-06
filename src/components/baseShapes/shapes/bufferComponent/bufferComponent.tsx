import {FC} from "react";

interface BufferComponentProps {
    positionVertices: Float32Array,
    normalVertices: Float32Array,
    color: string
}

export const BufferComponent: FC<BufferComponentProps> = ({positionVertices, normalVertices, color}) => {
    return (
        <>
            <bufferGeometry>
                <bufferAttribute attachObject={["attributes", "position"]} itemSize={3}
                                 array={positionVertices}
                                 count={positionVertices.length / 3}/>
                <bufferAttribute attachObject={["attributes", "normal"]} itemSize={3}
                                 array={normalVertices}
                                 count={normalVertices.length / 3}/>
            </bufferGeometry>
            <meshPhongMaterial color={color}/>
        </>
    )
}
import { FC, useMemo } from "react";
import { BufferComponent, CompositeEntity, meshFrom } from "../../..";



interface CompositeProps {
    entity: CompositeEntity
}

export const Composite: FC<CompositeProps> = ({ entity }) => {
    let compositeMesh = useMemo(() => meshFrom(entity), [entity.baseElements])

    return (
        <BufferComponent color={entity.color} positionVertices={compositeMesh.geometry.attributes.position.array as Float32Array} normalVertices={compositeMesh.geometry.attributes.normal.array as Float32Array}/>
    )
}
import { FC, useMemo } from "react";
import { meshFrom } from "../../../auxiliaryFunctionsUsingThree/auxiliaryFunctionsUsingThree";
import { CompositeEntity } from "../../../model/componentEntity/componentEntity";
import { BufferComponent } from "../bufferComponent/bufferComponent";

interface CompositeProps {
  entity: CompositeEntity;
  color: string;
  opacity: number;
  transparency: boolean
}

export const Composite: FC<CompositeProps> = ({ entity, color, opacity, transparency }) => {
  let compositeMesh = useMemo(() => meshFrom(entity), [entity.baseElements]);

  return (
    <BufferComponent
      color={color}
      positionVertices={
        compositeMesh.geometry.attributes.position.array as Float32Array
      }
      normalVertices={
        compositeMesh.geometry.attributes.normal.array as Float32Array
      }
      opacity={opacity} transparency={transparency}
    />
  );
};

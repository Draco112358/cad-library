export type {CanvasState} from "./canvasSlice"
export {
    CanvasSlice,
    addComponent,
    removeComponent,
    updateTransformationParams,
    updateEntityGeometryParams,
    selectComponent,
    incrementNumberOfGeneratedKey,
    setComponentMaterial, 
    removeComponentMaterial,
    updateName, 
    importStateCanvas,
    subtraction,
    union,
    intersection,
    resetState,

} from "./canvasSlice"
export {
    canvasStateSelector,
    canvasAllStateSelector,
    componentseSelector,
    keySelectedComponenteSelector,
    selectedComponentSelector,
    lengthFutureStateSelector,
    lengthPastStateSelector,
    lastActionTypeSelector,
    numberOfGeneratedKeySelector,
    findComponentByKey 
} from "./canvasSlice"
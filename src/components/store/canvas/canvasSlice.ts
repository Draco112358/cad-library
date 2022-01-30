import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateWithHistory } from 'redux-undo';
import { ComponentEntity, CubeEntity, SphereEntity, TransformationParams } from '../..';
import { ImportActionParamsObject } from '../../importFunctions/importFunctions';

export type CanvasState = {
    components: ComponentEntity[],
    numberOfGeneratedKey: number,
    selectedComponentKey: number,
    lastActionType: string
}

const initialState: CanvasState = {
    components: [],
    numberOfGeneratedKey: 0,
    selectedComponentKey: 0,
    lastActionType: ""
}

export const CanvasSlice = createSlice({
    name: 'canvas',
    initialState: initialState,
    reducers: {
        //qui vanno inserite le azioni
        addComponent(state: CanvasState, action: PayloadAction<ComponentEntity>) {
            setLastActionType(state, action.type)
            state.components.push(action.payload);
            state.selectedComponentKey = action.payload.keyComponent
        },
        removeComponent(state: CanvasState, action: PayloadAction<number>) {
            setLastActionType(state, action.type)
            state.components = state.components.filter(component => {
                return component.keyComponent !== action.payload;
            });
            (action.payload === state.selectedComponentKey) && setSelectedComponent(state, 0)
        },
        updateTransformationParams(state: CanvasState, action: PayloadAction<TransformationParams>){
            setLastActionType(state, action.type)
            let selectedComponent = findComponentByKey(state.components, state.selectedComponentKey)
            selectedComponent.previousTransformationParams = selectedComponent.transformationParams
            selectedComponent.transformationParams = action.payload
        },
        updateCubeGeometryParams(state: CanvasState, action: PayloadAction<{width: number, heigth: number, depth: number, widthSegments: number, heigthSegments: number, depthSegments: number}>){
            setLastActionType(state, action.type)
            let selectedComponent = findComponentByKey(state.components, state.selectedComponentKey);
            (selectedComponent as CubeEntity).width = action.payload.width;
            (selectedComponent as CubeEntity).height = action.payload.heigth;
            (selectedComponent as CubeEntity).depth = action.payload.depth;
            (selectedComponent as CubeEntity).widthSegments = action.payload.widthSegments;
            (selectedComponent as CubeEntity).heigthSegments = action.payload.heigthSegments;
            (selectedComponent as CubeEntity).depthSegments = action.payload.depthSegments;
        },
        updateSphereGeometryParams(state: CanvasState, action: PayloadAction<{radius: number, heigthSegments: number, widthSegments: number, phiLength: number, phiStart: number, thetaStart: number, thetaLength: number}>){
            setLastActionType(state, action.type)
            let selectedComponent = findComponentByKey(state.components, state.selectedComponentKey);
            (selectedComponent as SphereEntity).radius = action.payload.radius;
            (selectedComponent as SphereEntity).heightSegments = action.payload.heigthSegments;
            (selectedComponent as SphereEntity).widthSegments = action.payload.widthSegments;
            (selectedComponent as SphereEntity).phiLength = action.payload.phiLength;
            (selectedComponent as SphereEntity).phiStart = action.payload.phiStart;
            (selectedComponent as SphereEntity).thetaStart = action.payload.thetaStart;
            (selectedComponent as SphereEntity).thetaLength = action.payload.thetaLength;
        },
        selectComponent(state: CanvasState, action: PayloadAction<number>) {
            setLastActionType(state, action.type)
            state.selectedComponentKey = action.payload
        },
        incrementNumberOfGeneratedKey(state: CanvasState, action: PayloadAction<number>) {
            state.numberOfGeneratedKey += action.payload;
        },
        updateColor(state: CanvasState, action: PayloadAction<{ key: number, color: string }>) {
            setLastActionType(state, action.type)
            let component = findComponentByKey(state.components, action.payload.key);
            component.color = action.payload.color
        },
        updateName(state: CanvasState, action: PayloadAction<{ key: number, name: string }>) {
            setLastActionType(state, action.type)
            let component = findComponentByKey(state.components, action.payload.key);
            component.name = action.payload.name
        },
        importStateCanvas(state: CanvasState, action: PayloadAction<ImportActionParamsObject>) {
            setLastActionType(state, action.type)
            state.components = state.components.concat(action.payload.canvas.components)
             if(state.numberOfGeneratedKey < action.payload.canvas.numberOfGeneratedKey) {state.numberOfGeneratedKey = action.payload.canvas.numberOfGeneratedKey}
        },
        subtraction(state: CanvasState, action: PayloadAction<{elementsToRemove: number[], newEntity: ComponentEntity[], selectedEntityCopy: ComponentEntity}>){
            setLastActionType(state, action.type)
            state.components = state.components.filter(component => !action.payload.elementsToRemove.includes(component.keyComponent))
            action.payload.newEntity.map(entity => state.components.push(entity))
            state.components.push(action.payload.selectedEntityCopy)
            setSelectedComponent(state, action.payload.newEntity[action.payload.newEntity.length - 1].keyComponent)
        },
        union(state: CanvasState, action: PayloadAction<{elementsToRemove: number[], newEntity: ComponentEntity}>){
            setLastActionType(state, action.type)
            state.components = state.components.filter(component => !action.payload.elementsToRemove.includes(component.keyComponent))
            state.components.push(action.payload.newEntity)
            setSelectedComponent(state, action.payload.newEntity.keyComponent)
        },
        intersection(state: CanvasState, action: PayloadAction<{elementsToRemove: number[], newEntity: ComponentEntity[]}>){
            setLastActionType(state, action.type)
            state.components = state.components.filter(component => !action.payload.elementsToRemove.includes(component.keyComponent))
            action.payload.newEntity.map(entity => state.components.push(entity))
            setSelectedComponent(state, action.payload.newEntity[action.payload.newEntity.length - 1].keyComponent)
        },
        resetState(state: CanvasState){
            state.components = initialState.components
            state.selectedComponentKey = initialState.selectedComponentKey
            state.lastActionType = initialState.lastActionType
            state.numberOfGeneratedKey = initialState.numberOfGeneratedKey
        }


    },
    extraReducers: {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
    }
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    addComponent, removeComponent, updateTransformationParams, updateCubeGeometryParams, updateSphereGeometryParams, selectComponent, incrementNumberOfGeneratedKey,
    updateColor, updateName, importStateCanvas, subtraction, union, intersection, resetState
} = CanvasSlice.actions

export const canvasStateSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.present;
export const canvasAllStateSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas;
export const componentseSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.present.components;
export const keySelectedComponenteSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.present.selectedComponentKey;
export const selectedComponentSelector = (state: { canvas: StateWithHistory<CanvasState> }) => findComponentByKey(state.canvas.present.components, state.canvas.present.selectedComponentKey)
export const lengthPastStateSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.past.length
export const lengthFutureStateSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.future.length
export const lastActionTypeSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.present.lastActionType;
export const numberOfGeneratedKeySelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.present.numberOfGeneratedKey;

export const findComponentByKey = (components: ComponentEntity[], key: number) => components.filter(component => component.keyComponent === key)[0]
const setSelectedComponent = (state: CanvasState, keyComponentToSelect: number) => state.selectedComponentKey = keyComponentToSelect
const setLastActionType = (state: CanvasState, actionType: string) => state.lastActionType = actionType
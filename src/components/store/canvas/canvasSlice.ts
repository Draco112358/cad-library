import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Keys } from 'faunadb';
import { StateWithHistory } from 'redux-undo';
import { ComponentEntity, GeometryAttributes, getNewKeys, TransformationParams } from '../..';
import { ImportActionParamsObject } from '../../importFunctions/importFunctions';
import { Material } from '../../model/componentEntity/componentEntity';

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
        updateTransformationParams(state: CanvasState, action: PayloadAction<TransformationParams>) {
            setLastActionType(state, action.type)
            let selectedComponent = findComponentByKey(state.components, state.selectedComponentKey)
            selectedComponent.previousTransformationParams = selectedComponent.transformationParams
            selectedComponent.transformationParams = action.payload
        },
        updateEntityGeometryParams(state: CanvasState, action: PayloadAction<GeometryAttributes>) {
            setLastActionType(state, action.type)
            let selectedComponent = findComponentByKey(state.components, state.selectedComponentKey)
            selectedComponent.previousGeometryAttributes = selectedComponent.geometryAttributes
            selectedComponent.geometryAttributes = action.payload
        },
        selectComponent(state: CanvasState, action: PayloadAction<number>) {
            setLastActionType(state, action.type)
            state.selectedComponentKey = action.payload
        },
        incrementNumberOfGeneratedKey(state: CanvasState, action: PayloadAction<number>) {
            state.numberOfGeneratedKey += action.payload;
        },
        setComponentMaterial(state: CanvasState, action: PayloadAction<{ key: number, material: Material }>) {
            setLastActionType(state, action.type)
            let component = findComponentByKey(state.components, action.payload.key);
            component.material = action.payload.material
        },
        removeComponentMaterial(state: CanvasState, action: PayloadAction<{ keyComponent: number }>) {
            setLastActionType(state, action.type)
            let component = findComponentByKey(state.components, action.payload.keyComponent);
            component.material = undefined;
        },
        setComponentsOpacity(state: CanvasState, action: PayloadAction<{keys: number[], opacity: number}>){
            setLastActionType(state, action.type)
            let componentsToChange = state.components.filter(component => action.payload.keys.includes(component.keyComponent))
            componentsToChange.map(component => component.opacity = action.payload.opacity)
        },
        setComponentsTransparency(state: CanvasState, action: PayloadAction<{keys: number[], transparency: boolean}>){
            setLastActionType(state, action.type)
            let componentsToChange = state.components.filter(component => action.payload.keys.includes(component.keyComponent))
            componentsToChange.map(component => component.transparency = action.payload.transparency)
        },
        updateName(state: CanvasState, action: PayloadAction<{ key: number, name: string }>) {
            setLastActionType(state, action.type)
            let component = findComponentByKey(state.components, action.payload.key);
            component.name = action.payload.name
        },
        importStateCanvas(state: CanvasState, action: PayloadAction<ImportActionParamsObject>) {
            setLastActionType(state, action.type)
            state.components = state.components.concat(
                action.payload.canvas.components.map(component => {
                    component.keyComponent += state.numberOfGeneratedKey
                    return component
                })
            )
            state.numberOfGeneratedKey = maximumKeyComponentAmong(state.components)
        },
        binaryOperation(state: CanvasState, action: PayloadAction<{ elementsToRemove: number[], newEntity: ComponentEntity }>) {
            setLastActionType(state, action.type)
            state.components = state.components.filter(component => !action.payload.elementsToRemove.includes(component.keyComponent))
            state.components.push(action.payload.newEntity)
            setSelectedComponent(state, action.payload.newEntity.keyComponent)
        },
        resetState(state: CanvasState) {
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
    addComponent, removeComponent, updateTransformationParams, updateEntityGeometryParams, selectComponent, incrementNumberOfGeneratedKey,
    setComponentMaterial, removeComponentMaterial, updateName, importStateCanvas, binaryOperation, resetState, setComponentsOpacity, setComponentsTransparency
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
const maximumKeyComponentAmong = (components: ComponentEntity[]) => components.reduce((max, component) => max = (component.keyComponent > max) ? component.keyComponent : max,0) 
import { FC, ReactNode, useRef } from "react";
import { useDispatch } from "react-redux";
import { ImportActionParamsObject, importFromCadProject } from "./importFunctions";

interface ImportCadProjectButtonProps {
    importAction: (params: ImportActionParamsObject) => any,
    actionParams: ImportActionParamsObject
    className?: string,
    children: ReactNode
}

export const ImportCadProjectButton: FC<ImportCadProjectButtonProps> = ({importAction, actionParams, className, children}) => {

    const inputRefProject = useRef(null)
    const dispatch = useDispatch()

    const onImportProjectClick = () => {
        let input = inputRefProject.current
        if (input) {
            (input as HTMLInputElement).click()
        }

    };

    return (
        <button className={(className)? className : "btn-success"} onClick={onImportProjectClick}>
            {children}
            <input
                type="file"
                ref={inputRefProject}
                style={{ display: "none" }}
                accept="application/json"
                onChange={(e) => {
                    let files = e.target.files;
                    (files) && importFromCadProject(files[0], dispatch, importAction, actionParams)
                }} />
        </button>
    )

}
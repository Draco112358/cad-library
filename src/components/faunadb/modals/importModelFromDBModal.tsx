import { useAuth0 } from "@auth0/auth0-react";
import { Dialog, Transition } from "@headlessui/react";
import { FC, useEffect, useState, Fragment } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  ImportActionParamsObject,
  importCadModelFromDB,
} from "../../importFunctions/importFunctions";
import { FaunaCadModel, getModelsByOwner } from "../api/modelsAPIs";
import { useFaunaQuery } from "../useFaunaQuery";
import { getFileS3 } from "../../aws/modelsAPIs";

export const ImportModelFromDBModal: FC<{
  showModalLoad: Function;
  importActionParams: ImportActionParamsObject;
  importAction: (params: ImportActionParamsObject) => any;
}> = ({ showModalLoad, importActionParams, importAction }) => {
  const [models, setModels] = useState<FaunaCadModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<FaunaCadModel | undefined>(
    undefined
  );
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const { user } = useAuth0();
  const { execQuery } = useFaunaQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    user !== undefined &&
      user.sub !== undefined &&
      execQuery(getModelsByOwner, user.sub).then((mods) => {
        setModels(mods);
        models.length === 0 &&
          setLoadingMessage("No models to load form database.");
      });
  }, []);

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => showModalLoad(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Select model to load
                </Dialog.Title>
                <div className="mt-4">
                  {models.length === 0 ? (
                    <div>{loadingMessage}</div>
                  ) : (
                    <table className="table-auto">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Model name</th>
                          <th>Owner</th>
                        </tr>
                      </thead>
                      <tbody>
                        {models.map((model, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <input
                                  key={model.name}
                                  type="radio"
                                  value={model.name}
                                  name="modelSelection"
                                  onChange={() => setSelectedModel(model)}
                                />
                              </td>
                              <td>{model.name}</td>
                              <td>{model.owner}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => showModalLoad(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={
                      selectedModel === undefined
                        ? () => {
                            toast.error("You must select a model to load.");
                          }
                        : () => {
                            getFileS3(selectedModel.components).then(
                              (components) => {
                                if (components !== undefined) {
                                  importActionParams.canvas.components =
                                    components;
                                }
                              }
                            );
                            showModalLoad(false);
                            toast.success("Model successfully loaded");
                            importCadModelFromDB(
                              dispatch,
                              importAction,
                              importActionParams
                            );
                          }
                    }
                  >
                    Load
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

import * as Dialog from "@radix-ui/react-dialog";
import PropTypes from 'prop-types';
import Timeline from './Timeline';
const ShowTimeline = ({ shipment_status }) => {

    return (
        <Dialog.Root id="showTimelineModal" className="fixed inset-0 z-10 overflow-y-auto hidden">
            <Dialog.Trigger 
                className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
                <i className="fa-solid fa-table-list me-2"></i> Mostrar detalles
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 w-full h-full bg-black opacity-40" />
                <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                    <div className="bg-white rounded-md shadow-lg px-4 py-6">
                        <div className="flex items-center justify-end">
                            <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 mx-auto"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                                </svg>
                            </Dialog.Close>
                        </div>
                        <div className="max-w-sm mx-auto space-y-3 text-center">
                            <Dialog.Title className="text-lg font-medium text-gray-800 mb-8">
                                Información de la paquetería
                            </Dialog.Title>

                            <Dialog.Description className="text-sm text-left text-gray-600">
                                <Timeline shipment_status={shipment_status} />
                            </Dialog.Description>
                            
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

ShowTimeline.propTypes = {
    shipment_status: PropTypes.array
};

export default ShowTimeline;

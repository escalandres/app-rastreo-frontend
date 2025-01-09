import * as Dialog from "@radix-ui/react-dialog";

const AddTracker = () => {
    return (
        <Dialog.Root id="trackerModal" className="fixed inset-0 z-10 overflow-y-auto hidden">
            <Dialog.Trigger className="px-4 py-2 font-medium text-[#4f46e5] border-[#4f46e5] hover:bg-indigo-500 hover:text-white active:bg-indigo-600 rounded-lg duration-150">
                <i className="fa-solid fa-play me-2"></i> Iniciar envío
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
                        <div className="max-w-sm mx-auto space-y-3 text-center ">
                            <Dialog.Title className="text-lg font-medium text-gray-800 ">
                                Ingrese un nuevo envío
                            </Dialog.Title>

                            <Dialog.Description className=" text-sm text-gray-600">
                                <p>
                                Ingrese el código del rastreador para vincularlo a su cuenta. 
                                Una vez hecho, podrá gestionar y monitorear la ubicación de su(s) dispositivo(s).
                                </p>
                            </Dialog.Description>
                            <div className="flex items-center gap-4 mb-2">
                                <fieldset className="Fieldset relative text-left">
                                    <label for="countries" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Selecciona la empresa de paquetería</label>
                                    <select id="countries" className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 ">
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>France</option>
                                        <option>Germany</option>
                                    </select>
                                </fieldset>
                                <fieldset className="Fieldset relative text-left">
                                    <label for="countries" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Selecciona el servicio de envío</label>
                                    <select id="countries" className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 ">
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>France</option>
                                        <option>Germany</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                                <div>
                                    <fieldset className="Fieldset relative text-left">
                                        <label for="countries" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Guía de rastreo</label>
                                        <fieldset className="Fieldset relative">
                                            <svg 
                                                className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto fill-none stroke-gray-400"
                                                version="1.1" 
                                                id="Icons" 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                xmlnsXlink="http://www.w3.org/1999/xlink" 
                                                viewBox="0 0 24 24" 
                                                xmlSpace="preserve"
                                            >
                                                <path d="M8 8L8 16" />
                                                <path d="M12 8L12 16" />
                                                <path d="M16 8L16 16" />
                                                <path d="M8.976 21C4.05476 21 3 19.9453 3 15.024" />
                                                <path d="M20.9999 15.024C20.9999 19.9453 19.9452 21 15.0239 21" />
                                                <path d="M15.0239 3C19.9452 3 20.9999 4.05476 20.9999 8.976" />
                                                <path d="M3 8.976C3 4.05476 4.05476 3 8.976 3" />
                                            </svg>
                                            <input
                                                className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                                placeholder="Ingrese el código de rastreo"
                                            />
                                        </fieldset>
                                    </fieldset>
                                </div>
                            
                                <fieldset className="Fieldset relative text-left">
                                    <label for="countries" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Selecciona tu rastreador</label>
                                    <select id="countries" className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 ">
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>France</option>
                                        <option>Germany</option>
                                    </select>
                                </fieldset>
                            </div>
                            
                            <Dialog.Close asChild>
                                <button className=" w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2">
                                    Vincular rastreador
                                </button>
                            </Dialog.Close>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default AddTracker;
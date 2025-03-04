import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import PropTypes from 'prop-types';
import { alerta, showLoader, hideLoader } from '../../js/general';


const RegisterShipment = ({ containers, companies, token }) => {
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar si ya se ha enviado el formulario
    const [selectedCompany, setSelectedCompany] = useState(null); 
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar la apertura y cierre del modal
    const [services, setServices] = useState([]);
    const [tracker, setTracker] = useState('');
    const [company, setCompany] = useState('');
    const [service, setService] = useState('');
    const [trackingCode, setTrackingCode] = useState('');

    const handleCompanyChange = (event) => { 
        const companyId = event.target.value;
        alert(companyId);
        setCompany(companyId); 
        const selected = companies.find((company) => company.id === companyId); 
        setSelectedCompany(companyId); setServices(selected ? selected.services : []);
    };

    const handleStartShipment = async (e) => {
            e.preventDefault();
    
            if (isSubmitting) {
                return; // Evita que el formulario se vuelva a enviar
            }
    
            setIsSubmitting(true);
    
            try {
                showLoader();
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/start-shipment`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ trackerID: tracker.trim(), companyID: company.trim(), serviceID: service.trim(), trackingCode: trackingCode.trim() }),
                });
                hideLoader();
    
                if (!response.ok) {
                    alerta.autoError('Error al iniciar el envío. Inténtelo nuevamente.');
                } else {
                    const data = await response.json();
                    data.success ? alerta.autoSuccess(data.message) : alerta.autoError(data.message);
                    // Cerrar el modal después de mostrar la alerta
                    setTimeout(() => {
                        setIsOpen(false);
                        // Recargar la página actual
                        location.reload();
                    }, 500); // Ajusta el tiempo según sea necesario
                }
            } catch (error) {
                hideLoader();
                console.log('error', error.message);
            } finally {
                setIsSubmitting(false); // Restablece el estado de envío
            }
        };

    return (
        <Dialog.Root id="trackerModal" className="fixed inset-0 z-10 overflow-y-auto hidden" open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger className="px-4 py-2 font-medium text-[#4f46e5] border-[#4f46e5] hover:bg-indigo-500 hover:text-white active:bg-indigo-600 rounded-lg duration-150"
                onClick={() => setIsOpen(true)}
            >
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
                                    <label htmlFor="companies" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Empresas de paquetería</label>
                                    <select id="companies" className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 "
                                        onChange={handleCompanyChange}
                                    >
                                        <option value="">Seleccione una empresa</option>
                                        {
                                            companies && companies.length > 0 && companies.map((company, index) => (
                                                <option key={index} value={company.id}>{company.name}</option>
                                            ))
                                        }
                                    </select>
                                </fieldset>
                                <fieldset className="Fieldset relative text-left">
                                    <label htmlFor="services" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Servicio de envío</label>
                                    <select id="services" className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 "
                                        disabled={!selectedCompany}
                                        onChange={(e) => setService(e.target.value)}
                                    >
                                        <option value="">Seleccione un servicio</option> 
                                        {   services.map((service, index) => ( 
                                                <option key={index} value={service.id}> {service.name} </option> 
                                            ))
                                        }
                                    </select>
                                </fieldset>
                            </div>
                            {/* <div className="flex items-center gap-4 mb-2">
                                <div>
                                    <fieldset className="Fieldset relative text-left">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Guía de rastreo</label>
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
                                    <label htmlFor="trackers" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Rastreadores</label>
                                    <select id="trackers" className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 ">
                                        <option value="">Seleccione un rastreador</option>
                                        {
                                            containers && containers.length > 0 && containers.map((tracker, index) => (
                                                <option key={index} value={tracker.id}>{tracker.nickname}</option>
                                            ))
                                        }
                                    </select>
                                </fieldset>
                            </div> */}
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-full">
                                    <fieldset className="Fieldset relative text-left">
                                        <label htmlFor="trackers" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Rastreadores</label>
                                        <select id="trackers" className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 "
                                            onChange={(e) => setTracker(e.target.value)}
                                        >
                                            <option value="">Seleccione un rastreador</option>
                                            {
                                                containers && containers.length > 0 && containers.map((tracker, index) => (
                                                    <option key={index} value={tracker.id}>{tracker.nickname}</option>
                                                ))
                                            }
                                        </select>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-full">
                                    <fieldset className="Fieldset w-full text-left">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Guía de rastreo</label>
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
                                                onChange={(e) => setTrackingCode(e.target.value)}
                                                placeholder="Ingrese el código y/o guía de rastreo"
                                            />
                                        </fieldset>
                                    </fieldset>
                                </div>
                            </div>
                            
                            <Dialog.Close asChild>
                                <button className=" w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
                                    onClick={handleStartShipment}
                                >
                                    Registrar nuevo envío
                                </button>
                            </Dialog.Close>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

RegisterShipment.propTypes = {
    containers: PropTypes.array,
    companies: PropTypes.array,
    token: PropTypes.string
};


export default RegisterShipment;
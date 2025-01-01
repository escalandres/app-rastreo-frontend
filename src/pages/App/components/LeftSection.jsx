import React from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import ScrollContainer from "./ScrollContainer";
import AddTracker from './AddTracker';
import RegisterShipment from './RegisterShipment';
import { alerta, showLoader, hideLoader } from '../../js/general';

const LeftSection = ({ setContainer, getUserContainers }) => {
    const [trackers, setTrackers] = React.useState([]);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    // console.log(decoded); // Aquí tendrás acceso a los datos del JWT
    
    // Por ejemplo, si tienes un campo llamado "userId"
    const userName = decoded.user.name;
    const itemsTest = [
        { id: 48273619, img: '/icons/send-box.png', nickname: "Paquete 1", }, 
        { id: 59102473, img: '/icons/picture.png', nickname: "Paquete 2",},
        { id: 30814562, img: '/icons/phone.png', nickname: "Paquete 3",},
        { id: 91272515, img: '/icons/send-box.png', nickname: "Paquete 4",},
    ]

    React.useEffect(() => { // Esta función se ejecuta al cargar el componente miFuncionAlCargar();
        let items = getUserContainers();
        setTrackers(items);
    }, [getUserContainers]); // El segundo argumento es un arreglo de dependencias, si está vacío solo se ejecuta una vez

    // const getUserContainers = async (e) => {
    //     e.preventDefault();
        
        

    // };

    const handleItemClick = (containerID) => {
        setContainer(containerID);
    };

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-left text-lg font-bold mb-4">Bienvenido, {userName}</h1>
            <div className="flex items-center gap-4 mb-2">
                <AddTracker />
                <RegisterShipment />
            </div>
            <ScrollContainer items={trackers} width={100} height={30} onItemClick={handleItemClick} />
        </div>
    );
}

LeftSection.propTypes = {
    setContainer: PropTypes.string,
    getUserContainers: PropTypes.func,
};

export default LeftSection;
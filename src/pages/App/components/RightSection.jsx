import { useState } from 'react';
import MarkerContainer from "./MarkerContainer";
import MapItem from "./MapItem";

const RightSection = () => {
    const [center, setCenter] = useState({ lat: 19.378348, lng: -99.194816 });
    const items = [
        { coordenadas: { lat: 19.378348, lng: -99.194816 }, date: "24/10/23,09:16:59-24", status: "En camino" },
        { coordenadas: { lat: 19.371597, lng: -99.203664 }, date: "24/10/23,09:51:53-24", status: "En camino" },
        { coordenadas: { lat: 19.336248, lng: -99.176434 }, date: "24/10/23,09:56:05-24", status: "En camino" },
        { coordenadas: { lat: 19.335635, lng: -99.157027 }, date: "24/10/23,09:58:05-24", status: "En camino" },
        { coordenadas: { lat: 19.357984, lng: -99.160291 }, date: "24/10/23,10:05:05-24", status: "En camino" },
        { coordenadas: { lat: 19.367132, lng: -99.126199 }, date: "24/10/23,10:16:05-24", status: "En camino" },
        { coordenadas: { lat: 19.382153, lng: -99.085371 }, date: "24/10/23,10:56:05-24", status: "En camino" }
    ];
    
    const handleItemClick = (coordenadas) => {
        setCenter(coordenadas);
    };

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-left text-lg font-bold mb-4">Ubicación del envío</h1>
            <div className="flex flex-grow overflow-hidden">
                <div className="w-1/2 h-full no-padding flex flex-col">
                    <MapItem center={center} />
                </div>
                <div className="w-1/2 h-full no-padding flex flex-col">
                    <MarkerContainer items={items} width={40} height={40} onItemClick={handleItemClick} />
                </div>
            </div>
            </div>
        
    );
}

export default RightSection;

import MarkerContainer from "./MarkerContainer";
import MapItem from "./MapItem";

const RightSection = () => {

    const items = [{
        coordenadas: {lat: 19.378348, lng: -99.194816},
        date: "24/10/23,09:16:59-24",
        status: "En camino",
    },{
        coordenadas: {lat: 57.699711, lng: -19.731649},
        date: "24/10/23,09:51:53-24",
        status: "En camino",
    },{coordenadas: {lat: -48.234066, lng: -174.622253},
        date: "24/10/23,09:56:05-24",
        status: "En camino"}]

    return (
        <>
            <h1 className="text-left text-lg font-bold mb-4">Ubicación del envío</h1>
            <div className="flex items-start justify-center h-screen">
                
                <MapItem/>
                <MarkerContainer items={items} width={40} height={40} />
            </div>
        </>
        
    );
}

export default RightSection;
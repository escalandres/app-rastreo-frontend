
const Minuta = () => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex mx-16 max-w-5xl">
            {/* Lado izquierdo  */}
            <div className="md:w-2/3 px-12 py-8">
                <h3
                className="text-3xl cosmos-orange-text font-bold mb-4 text-center tracking-wider"
                >
                Daños y Pérdidas en el Arte
                </h3>
                <p className="text-gray-700 mt-2 text-center">
                Cada obra es única y valiosa pero los embalajes tradicionales y logística
                anticuada, generan daños, pérdidas y retrasos.
                <br /><br /> La falta de digitalización amplía el problema al opacar el seguimiento
                de las obras durante el transporte.
                </p>
                <p className="text-sm text-[#9795B5] font-bold text-center my-4">
                ¿Sabías qué...?
                </p>
                <p className="text-sm text-[#9795B5] text-center">
                La logística y el transporte son los principales factores que contribuyen
                a las emisiones de CO2 en el mundo artístico.
                </p>
            </div>
            {/* Lado derecho */}
            <div className="md:w-1/3">
                <img
                className="w-full md:h-full object-cover"
                src="/img/gallery.webp"
                alt="Gallery"
                />
            </div>
        </div>
    );
};

export default Minuta;
import PropTypes from 'prop-types';
const TeamCard = ({ name, position, body, img, description }) => {
    return (
        <div className="bg-white border border-solid border-gray-300 rounded-lg shadow-xl py-12">
            <img
                src={img}
                className="team-card__image mx-auto"
                alt={description}
                onError={(e) => e.target.src = '/icons/default-img.svg'} // Manejo del error de carga de imagen
            />
            <div className="justify-center px-16">
                <h3 className="text-center text-2xl text-[#5D5A88] font-bold my-4">{name}</h3>
                <div className="text-center">
                    <span className="inline-block text-[#8D8BA7]">{position}</span>
                </div>
                <p className="text-center mt-4 text-[#9795B5]">
                    {body}
                </p>
            </div>
        </div>
    );
};


// Definir validaciones de prop-types
TeamCard.propTypes = {
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    description: PropTypes.string
};

// Definir valores por defecto para props opcionales
TeamCard.defaultProps = {
    description: 'Default description'
};

export default TeamCard;

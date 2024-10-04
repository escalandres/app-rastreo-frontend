import PropTypes from "prop-types";

const SectionContainer = ({ id, className, children }) => {
  return (
    <section
      id={id}
      data-section={id}
      className={`section ${className} w-full mx-auto`}
    >
      {children}
    </section>
  );
};

// Definir validaciones de prop-types
SectionContainer.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

export default SectionContainer;

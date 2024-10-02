import React from 'react';

const Section = ({ id, className, children }) => {
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

export default Section;

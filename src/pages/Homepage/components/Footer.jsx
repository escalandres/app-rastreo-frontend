const Footer = () => {
    return (
        <div className="bg-[#2B3441] flex justify-center items-center">
            <div className="text-white text-center px-80 py-20">
                <img
                src="/icons/orange-favicon.svg"
                className="h-1/2 w-1/3 mx-auto my-16"
                alt="Cosmos Logo"
                />
                <p className="text-white text-2xl">
                “Somewhere, something incredible is waiting to be known.”
                <br />― Carl Sagan
                </p>
            </div>
        </div>
    );
};

export default Footer;
import { useEffect, useRef, useState } from 'react'

import Header from './App/components/Header';
import Header2 from './App/components/Header2';
import LeftSection from './App/components/LeftSection';
import MapItem from './App/components/MapItem';
import './App/css/app.css';
import RightSection from './App/components/RightSection';

const Home = () => {

    return (
        <div className='bg-gray-10 dark:bg-gray-50 max-h-screen '>
            <Header2 />
            {/* <div>
                <div className='bg-gray-50 dark:bg-gray-800'>
                    <div className='container mx-auto'>
                        <div className='flex flex-col items-center justify-center py-20'>
                            <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>Home</h1>
                            <p className='text-lg text-gray-500 dark:text-gray-300'>Welcome to the Home page</p>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="app__container text-black p-20">
                <div className="column-40 bg-blue-400 max-h-screen ">
                    <LeftSection />
                </div>
                <div className="column-60 p-40 max-h-screen ">
                    <RightSection/>
                    {/* <MapItem/> */}
                </div>
            </div>
        </div>
    )
}

export default Home;
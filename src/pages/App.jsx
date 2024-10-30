import { useEffect, useRef, useState } from 'react';
import Header2 from './App/components/Header2';
import LeftSection from './App/components/LeftSection';
import './App/css/app.css';
import RightSection from './App/components/RightSection';

const App = () => {
    return (
        <div className='bg-gray-10 dark:bg-gray-50 flex flex-col h-screen'>
            <Header2 />
            <div className="flex-grow app__container text-black px-4 py-4 overflow-auto">
                <div className="column-40">
                    <LeftSection />
                </div>
                <div className="column-60">
                    <RightSection />
                </div>
            </div>
        </div>
    )
}

export default App;

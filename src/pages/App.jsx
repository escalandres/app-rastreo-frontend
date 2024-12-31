import React from 'react';
import Header from './App/components/Header';
import LeftSection from './App/components/LeftSection';
import './App/css/app.css';
import RightSection from './App/components/RightSection';

const App = () => {
    const [container, setContainer] = React.useState("Estado inicial");
    
    return (
        <div className='bg-gray-10 dark:bg-gray-50 flex flex-col h-screen'>
            <Header />
            <div className="flex-grow app__container text-black px-4 py-4 overflow-auto">
                <div className="column-40">
                    <LeftSection setContainer={setContainer} />
                </div>
                <div className="column-60">
                    <RightSection container={container} />
                </div>
            </div>
        </div>
    )
}

export default App;

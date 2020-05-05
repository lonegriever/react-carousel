import React from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';

function App() {
    return (
        <div className="App">
            <Carousel
                type="image--carousel"
                // images={[openning, lifeSucks, characters, finnAndJake]}
                images={[
                    'https://unsplash.it/1280/768',
                    'https://unsplash.it/1281/768',
                    'https://unsplash.it/1282/768',
                    'https://unsplash.it/1283/768'
                ]}
            />
            <button onClick={() => alert('button works!')} >Click me!</button>
        </div>
    );
}

export default App;

import React, {useRef, useEffect, useState} from 'react';
import './CarouselStyle.scss';
import PropTypes from 'prop-types';

import { 
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';

function Carousel(props) {
    const carouselRef = useRef(null);
    const imageRef = useRef(null);
    const itemContainerRef = useRef(null);
    const listItemRef = useRef(null);
    
    const [activeIndex, setActiveIndex] = useState(1);
    const [itemWidth, setItemWidth] = useState(0);

    useEffect(() => {
        const rect = imageRef.current.getBoundingClientRect();
        setItemWidth(rect.width);
    }, []);

    const setDimensions = () => {
        const imageRect = imageRef.current.getBoundingClientRect();
        itemContainerRef.current.style.height = imageRect.height + 'px';
    }

    const imageLoad = () => {
        setDimensions();
    }

    const navigateCarousel = (e) => {
        const direction = e.target.closest('button').dataset.direction 
        switch(direction) {
            case 'previous':
                    if (activeIndex - 1 === 0) {
                        itemContainerRef.current.style.height = imageRef.current.getBoundingClientRect().height + 'px';
                        setTimeout(() => {
                            itemContainerRef.current.classList.remove('translate--transition');
                            setActiveIndex(props.images.length);
                        }, 400);

                        setTimeout(() => {
                            itemContainerRef.current.classList.add('translate--transition');
                        }, 410);
                    }
                    setActiveIndex(activeIndex - 1);
                break;
            case 'next':
                    if (!imageRef.current) return;
                    if (activeIndex + 1 > props.images.length) {
                        itemContainerRef.current.style.height = imageRef.current.getBoundingClientRect().height + 'px';
                        setTimeout(() => {
                            itemContainerRef.current.classList.remove('translate--transition');
                            setActiveIndex(1);
                        }, 400)
                        setTimeout(() => {
                            itemContainerRef.current.classList.add('translate--transition');
                        }, 410);
                    }
                    setActiveIndex(activeIndex + 1);
                break;
            default:
                throw new Error(`${direction} is invalid`);
        }
    }
    
    useEffect(() => {
        if (!listItemRef.current) return;
        const left = listItemRef.current.style.left;
        itemContainerRef.current.style.transform = `translateX(-${left})`;
        itemContainerRef.current.style.height = imageRef.current.getBoundingClientRect().height + 'px';
        setDimensions();
    }, [activeIndex])

    useEffect(() => {
        const rect = imageRef.current.getBoundingClientRect();
        setItemWidth(rect.width);
        itemContainerRef.current.style.transform = `translateX(-${rect.width}px)`;
    }, []);

    return (
        <div className="Carousel" ref={carouselRef}>
            <button
                data-direction="previous"
                className="navigation--button previous--button"
                onClick={navigateCarousel}>
                <ChevronLeftIcon/>
            </button>
            <button 
                data-direction="next"
                className="navigation--button next--button ripple" 
                onClick={navigateCarousel}>
                <ChevronRightIcon/>
            </button>
            <ul className="item--container translate--transition" ref={itemContainerRef}>
                {[props.images[props.images.length - 1], ...props.images, props.images[0]].map((el, index) => (
                    <li 
                        ref={index === activeIndex ? listItemRef : null}
                        key={index}
                        style={{
                            left: `${index * itemWidth}px`,
                        }}>
                        <img src={el} alt="item" 
                            ref={index === activeIndex ? imageRef : null} onLoad={imageLoad}
                        />
                    </li>
                ))}
            </ul>
            <div className="slideControls">
                {props.images.map((el, index) => (
                    <button 
                        key={index}
                        className={`${index + 1 === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}>
                        <span></span>
                    </button>
                ))}
            </div>
        </div>
    )
}

Carousel.propTypes = {
    type: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string)
}

export default Carousel;
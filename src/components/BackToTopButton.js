import '../styles/BackToTopButton.css';

import { useState, useEffect } from 'react';
import { ScrollPageToTop } from '../utils/Page';

const BackToTopButton = () => {

    const [isAppeared, setIsAppeared] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setIsAppeared(window.scrollY > 300)
        })
    }, []);

    return (
        <div className='BackToTopButton'>
            {isAppeared && <button className='btn hvr-gray' onClick={(e) => ScrollPageToTop(true)}>⬆</button>}
        </div>
     );
}
 
export default BackToTopButton;
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import AppOne from 'remote-reactapp-one';
import AppTwo from 'remote-reactapp-two/the-app-contents';
import three from 'remote-jqueryapp/app-fn';

const App = () => {
    const externalAppCode = useRef(null);

    useEffect(() => {
        const el = three();
        externalAppCode.current.appendChild(el);
    }, []);

    return (
        <div>
            <AppOne />
            <AppTwo />
            
            <section ref={externalAppCode}>
                <p>Other app HTML...</p>
            </section>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'), () => {
    console.log('everything got rendered! wow!');
});

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import AppOne from 'remote-reactapp-one';
import AppTwo from 'remote-reactapp-two/the-app-contents';
import three from 'remote-jqueryapp/app-fn';

const App = () => {
    useEffect(() => three(), []);

    return (
        <div>
            <AppOne />
            <AppTwo />
        </div>
    )
};

ReactDOM.render(document.getElementById('root'), <App />);

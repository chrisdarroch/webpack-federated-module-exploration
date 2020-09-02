import $ from 'jquery';
import anApp from './app';

console.log('jqueryapp loaded');

function init() {
    $(() => {
        console.log('dom is loaded!');
        document.body.appendChild(anApp());
    });
}

export default init;

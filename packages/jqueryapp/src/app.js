console.log('jqueryapp function loaded');

export default function anApp() {
    const d = document.createElement('div');
    d.innerHTML = `<p>Some random jQuery content appears</p>`;
    return d;
};

const { createElement, render, Component } = require('preact');
const h = createElement;
const { ipcRenderer, desktopCapturer, remote } = require('electron');

var $ = require("jquery");

class App extends Component {
    constructor(props) {
        super(props);
		this.state = {};
	}
	
	componentDidMount = () =>  {

    }
    
	openLink = link => {
		ipcRenderer.sendSync('executeLink', link);
	}

	playGame = () => {
		ipcRenderer.sendSync('playGame');
    }
    
	closeApp = () => {
		window.close();
	}

	minimizeApp = () => {
		remote.BrowserWindow.getFocusedWindow().minimize();
	}

    render = () =>  {
		return h('div', {id: 'launcher'},
            h('div', {class: 'close', onClick: this.closeApp},
                h('i', {class: 'fas fa-times'})
            ),

            h('div', {class: 'minimize', onClick: this.minimizeApp},
                h('i', {class: 'fas fa-window-minimize'})
            ),

            h('div', {class: 'panel'},
                h('div', {class: 'logo'},
                    h('img', {src: __dirname + '/app/cdn/logo.png'})
                ),
                h('div', {class: 'news'},
                    
                )
            
            )
			
		)
    }
}

render(h(App), document.querySelector('#render'));
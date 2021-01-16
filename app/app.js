const { createElement, render, Component } = require('preact');
const h = createElement;
const { ipcRenderer, desktopCapturer, remote } = require('electron');

var $ = require("jquery");

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.tabs = ['news', 'updates'];
	}
	
	componentDidMount = () =>  {
        this.switchPage(this.tabs[0])
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
    
    switchPage = page => {
        this.tabs.forEach(row => {
            document.getElementById(row).style = 'display: none';
            document.getElementById(`${row}-p`).style = 'font-weight: normal;'
        })
        document.getElementById(page).style = 'display: block';
        document.getElementById(`${page}-p`).style = 'font-weight: bold;'
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
                    h('div', {class: 'news-header'},
                        h('div', {class: 'item', onClick: () => { this.switchPage('news') }}, h('span', {id: 'news-p'}, 'Duyurular') ),
                        h('div', {class: 'item', onClick: () => { this.switchPage('updates') }}, h('span', {id: 'updates-p'}, 'Güncelleme Notları') ),

                      
                    ),
                    h('div', {class: 'page-content', id: 'news'},
                        h('iframe', {src: 'serverlink/news'})
                    ),

                    h('div', {class: 'page-content', id: 'updates'},
                        h('iframe', {src: 'serverlink/updates'})
                    )
                )
            
            ),
            h('div', {class: 'social-links'},
                h('a', {href: '#'}, h('i', {class: 'fab fa-discord'})),
                h('a', {href: '#'}, h('i', {class: 'fab fa-facebook-f'})),
                h('a', {href: '#'}, h('i', {class: 'fab fa-instagram'})),
                h('a', {href: '#'}, h('i', {class: 'fab fa-youtube'}))
            ),

            h('a', {href: '#', class: 'play'}, 'Hemen Oyna')
			
		)
    }
}

render(h(App), document.querySelector('#render'));
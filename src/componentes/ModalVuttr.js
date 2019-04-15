import React, { Component } from 'react';
import "./ModalVuttr.css";

class ModalVuttr extends Component {
	constructor(props) {
    	super(props);

	    this.pressionarButton = this.pressionarButton.bind(this);
	    this.listenerOutsideClick = this.listenerOutsideClick.bind(this);
  	}

	componentDidMount() {
  		window.addEventListener('keyup', this.pressionarButton, false);
  		document.addEventListener('mousedown', this.listenerOutsideClick, false);
	}

	componentWillUnmount() {
  		window.removeEventListener('keyup', this.pressionarButton, false);
  		document.removeEventListener('mousedown', this.listenerOutsideClick, false);
	}

	listenerOutsideClick(e) {
  		const { fecharModal } = this.props;

  		if (this.modal !== null) {
    		if (!this.modal.contains(e.target)) {
	      		fecharModal();
	      		document.removeEventListener('mousedown', this.listenerOutsideClick, false);
	      		return;
    		}
  		}
	}

	pressionarButton(e)  {
		const { fecharModal } = this.props;

  		const teclas = {
    		27: () => {
	      		e.preventDefault();
	      		fecharModal();
	      		window.removeEventListener('keyup', this.pressionarButton, false);
    		}
  		};

  		if (teclas[e.keyCode]) { teclas[e.keyCode](); }
	}


	render() {
		const { children } = this.props;

  		return (
	    <div className="modalOverlay">
	      <div
	        className="modal w-50 center mb5 ba b--black-20 br4-l pb3 pt3 pr4"
	        ref={node => (this.modal = node)}
	      >
	      	{children}
	      </div>
	    </div>
  		);
	}
}
export default ModalVuttr;
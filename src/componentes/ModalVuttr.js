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
  		document.addEventListener('click', this.listenerOutsideClick, false);
	}

	componentWillUnmount() {
  		window.removeEventListener('keyup', this.pressionarButton, false);
  		document.removeEventListener('click', this.listenerOutsideClick, false);
	}

	listenerOutsideClick(e) {
  		const { fecharModal } = this.props;

  		if (this.modal !== null) {
    		if (!this.modal.contains(e.target)) {
      		fecharModal();
      		document.removeEventListener('click', this.listenerOutsideClick, false);
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
	        className="modal"
	        ref={node => (this.modal = node)}
	      >
	      	{children}
	      </div>
	    </div>
  		);
	}
}
export default ModalVuttr;
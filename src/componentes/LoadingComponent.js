import React, { useState, useEffect } from 'react';
import './LoadingComponent.css';
///Aqui vou receber a mensagem e apos interação do usuario, volto uma mensagem para fechar o componente

const LoadingComponent = ({ ...props }) => {
	const { 
		respostaFetchUsuario, 
		fecharModal 
	} = props,
		[timerLoad, setTimerLoad] = useState(false);

	useEffect(() => {
		if (respostaFetchUsuario !== "") {
			setTimeout(setTimerLoad, 500, true);
		} else {
			setTimerLoad(false);
		}
	});
	
	return(
		timerLoad === false ?
		<div className="loader" ></div>
		:
		<>
			<span>{ respostaFetchUsuario }</span>
			<button type="button" onClick={ fecharModal }>Cancelar</button>
		</>
	);
};
export default LoadingComponent;
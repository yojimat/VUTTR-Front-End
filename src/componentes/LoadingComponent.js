import React, { useState, useEffect } from 'react';
import './LoadingComponent.css';

const LoadingComponent = ({ ...props }) => {
	const { respostaFetchUsuario, 
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
			<br />
			{fecharModal &&
				<button type="button" 
					onClick={ fecharModal }
					className="br2 ph3 pv2 mb2 dib white mr4 bg-amarelo ml4 mt3"
				>
					Voltar
				</button>
			}
		</>
	);
};
export default LoadingComponent;
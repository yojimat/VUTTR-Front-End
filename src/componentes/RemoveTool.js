import React from 'react';
import LoadingComponent from "./LoadingComponent";
import Check from "../helpers/icones/Check.svg";
import Close from "../helpers/icones/Close.svg";

const RemoveTool = ({...props }) => {
	const { isLoading,
		nomeTool,
		fecharModal,
		deleteTool,
		respostaFetchUsuario
	} = props;

	return(
		isLoading === true ?
			<LoadingComponent 
				respostaFetchUsuario={ respostaFetchUsuario }
				fecharModal={ () => fecharModal()}
			/>
			:
			<section className="removeTool">
				<p>Você tem certeza que quer remover <strong className="azul">{nomeTool}</strong> da lista?</p>
				<button type="button" 
					onClick={ fecharModal }
					className="br2 ph3 pv2 mb2 dib white mr4 bg-amarelo"
				>
					<span><img src={Close} alt="check" height="20" width="20"/>Cancelar</span>
				</button>
				<button type="submit" 
					onClick={ deleteTool }
					className="br2 ph3 pv2 mb2 dib white bg-vermelho"
				>
					<span><img src={Check} alt="check" height="20" width="20"/>Sim, deletar.</span>
				</button>
			</section>
	);
}
export default RemoveTool;
import React from 'react';
import LoadingComponent from "./LoadingComponent";

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
					className="dim br3 ph3 pv2 mb2 dib black mr4 bg-amarelo"
				>
					<span>Cancelar</span>
				</button>
				<button type="submit" 
					onClick={ deleteTool }
					className="dim br3 ph3 pv2 mb2 dib black bg-vermelho"
				>
					<span>Sim, deletar.</span>
				</button>
			</section>
	);
}
export default RemoveTool;
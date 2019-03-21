import React from 'react';
import LoadingComponent from "./LoadingComponent";

const RemoveTool = ({...props }) => {
	const { 
		isLoading,
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
				<p>Você tem certeza que quer remover {nomeTool} da lista?</p>
				<button type="button" onClick={ fecharModal }>Cancelar</button>
				<button type="submit" onClick={ deleteTool }>Sim, deletar.</button>
			</section>
	);
}
export default RemoveTool;
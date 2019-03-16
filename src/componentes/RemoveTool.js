import React from 'react';

const RemoveTool = ({...props }) => {
	return(
		<section className="removeTool">
			<p>Você tem certeza que quer remover {props.nomeTool} da lista?</p>
			<button type="button" onClick={props.fecharModal}>Cancelar</button>
			<button type="submit" onClick={props.deleteTool}>Sim, deletar.</button>
		</section>
	);
}
export default RemoveTool;
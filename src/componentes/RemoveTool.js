import React from 'react';

const RemoveTool = ({...props }) => {
	return(
		<section>
			<p>Você tem certeza que quer remover esta Tool:"ferramenta" da lista?</p>
			<button type="button" onClick={props.fecharModal}>Cancelar</button>
			<button type="submit" onClick={props.deleteTool}>Sim, deletar.</button>
		</section>
	);
}
export default RemoveTool;
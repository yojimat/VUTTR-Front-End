import React, { Component } from "react";
import Vuttr from "./componentes/Vuttr";
import ModalVuttr from "./componentes/ModalVuttr";
import AddTool from "./componentes/AddTool";
import RemoveTool from "./componentes/RemoveTool";

class App extends Component {
	constructor() {
  		super();
  		this.ref = React.createRef();
  		this.state = {
    		modalAdicionarAberta: false,
    		modalDeleteAberta: false,
    		toolsList: [],
    		toolIdDelete: null,
    		nomeTool: "",
    		tagFiltro: false
  		};
	}

	componentDidMount() {
		this.getListaTools();
	}

	getListaTools() {
		fetch("/tools", {
			method: "get",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(resp => resp.json())
		.then(data => {
			this.setState({ toolsList: data });
		})
		.catch(error => console.log(error));
	}

	getListaToolsBuscaGlobal(busca) {
		fetch(`/tools?q=${busca}`, {
			method: "get",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(resp => resp.json())
		.then(data => {
			this.setState({ toolsList: data });
		})
		.catch(error => console.log(error));
	}

	getListaToolsBuscaTag(tag) {
		fetch(`/tools?tags_like=${tag}`, {
			method: "get",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(resp => resp.json())
		.then(data => {
			this.setState({ toolsList: data });
		})
		.catch(error => console.log(error));
	}

	//ArrowFunction como método para receber valorPesquisa, evitando erro de propagação.
	pesquisaFiltradasTools = (valorPesquisa) => {
		const { tagFiltro } = this.state;
		if (tagFiltro) {
			this.getListaToolsBuscaTag(valorPesquisa);
		} else {
			this.getListaToolsBuscaGlobal(valorPesquisa);
		}
	}

	toggleTagFiltro = (ref) => {
		this.setState({ tagFiltro: !this.state.tagFiltro }, () =>{
			this.pesquisaFiltradasTools(ref);
		});
	}

	toggleModal () {
  		this.setState({ modalAdicionarAberta: !this.state.modalAdicionarAberta });
	}

	//ArrowFunction como método para receber id, evitando erro de propagação.
	toggleModalDelete = (item) => {
  		this.setState(
  			{ modalDeleteAberta: !this.state.modalDeleteAberta },
  			() => {
  				if (this.state.modalDeleteAberta === true) { 
  					this.setState({
  						toolIdDelete: item.id,
  						nomeTool: item.title
  					}) 
  				}
				else { this.setState({toolIdDelete: null}) }
  			}
  		);
	}

	deleteTool() {
		const { toolIdDelete } = this.state;

		fetch(`/tools/${toolIdDelete}`,{
			method: "delete",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(resp => {
			this.getListaTools();
			this.toggleModalDelete();
		})
		.catch(error => console.log(error));
	}

	adicionarTool = (form) => {
		return fetch("/tools/",{
			method: "post",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form)      
		})
		.then(resp => {
			this.getListaTools();
			return resp.json();
		})
		.catch(error => console.log(error));
	}

	render() {
		const { modalAdicionarAberta, modalDeleteAberta, toolsList, nomeTool } = this.state;

		return(
			<div>
				<Vuttr 
					abrirModal={() => this.toggleModal()} 
					abrirModalDelete={ this.toggleModalDelete }
					toolsList={ toolsList }
					ref={this.ref}
					pesquisaFiltradasTools={ this.pesquisaFiltradasTools }
					toggleTagFiltro={ this.toggleTagFiltro }
				/>
				{modalAdicionarAberta &&
					<ModalVuttr fecharModal={() =>this.toggleModal()}>
						<AddTool 
							fecharModal={() =>this.toggleModal()}
							adicionarTool={ this.adicionarTool }
						/>
					</ModalVuttr>}
				{modalDeleteAberta &&
					<ModalVuttr fecharModal={() =>this.toggleModalDelete()}>
						<RemoveTool 
							fecharModal={() =>this.toggleModalDelete()}
							deleteTool={() =>this.deleteTool()}
							nomeTool={ nomeTool }
						/>
					</ModalVuttr>}				
			</div>
		);
	}
}
export default App;

//Ideias: 
//Resetar input search box.-tentei
//Na pesquisa por tag fazer um highlight tna tags achadas.-tentei
//Quando deletar manda uma msg para o usuario que o item foi deletado com sucesso.
//Quando adicionar mandar uma msg para o usuario.
//Mensagens de validação para erros de conexão, depois do loading do aperta do botão.
//Adicionar loading da lista.
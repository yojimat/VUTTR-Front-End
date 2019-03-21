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
    		tagFiltro: false,
    		isLoading: false,
    		respostaFetchUsuario: ""
  		};
	}

	componentDidMount() {
		this.getListaTools();
	}

	async getListaTools() {
		const dados =  await fetch("/tools", {
			method: "get",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(resp => resp.json())
		.then(data => {
			return data;
		})
		.catch(error => console.log(error));

		if (dados !== undefined) {
			this.setState({ toolsList: dados });
		}	
	}

	async getListaToolsBuscaGlobal(busca) {
		const dados =  await fetch(`/tools?q=${busca}`, {
			method: "get",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(resp => resp.json())
		.then(data => {
			return data;
		})
		.catch(error => console.log(error));

		if (dados !== undefined) {
			this.setState({ toolsList: dados });
		}	
	}

	async getListaToolsBuscaTag(tag) {
		const dados =  await fetch(`/tools?tags_like=${tag}`, {
			method: "get",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(resp => resp.json())
		.then(data => {
			return data;
		})
		.catch(error => console.log(error));

		if (dados !== undefined) {
			this.setState({ toolsList: dados });
		}	
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

	toggleTagFiltro = (refValue) => {
		this.setState({ tagFiltro: !this.state.tagFiltro }, () =>{
			this.pesquisaFiltradasTools(refValue);
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
  				if (this.state.modalDeleteAberta === true && item !== undefined) { 
  					this.setState({
  						toolIdDelete: item.id,
  						nomeTool: item.title
  					}); 
  				} else { 
					this.setState({
						toolIdDelete: null,
						nomeTool: ""
					});
					this.loaderStatus("mensagemRecebida");
				}
  			}
  		);
	}
	//Retornar resposta para faciliar testes.
	deleteTool() {
		const { toolIdDelete } = this.state;

		this.loaderStatus();

		fetch(`/tools/${toolIdDelete}`,{
			method: "delete",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(resp => {
			this.getListaTools();

			if (resp.status === 200) { this.loaderStatus("Sucesso!") }
				else { this.loaderStatus(".") }
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

	//Adicionar teste.
	loaderStatus = (mensagem = "loading") => {
		if (mensagem === "loading") { this.setState({ isLoading: true }) } 
			else if ( mensagem === "mensagemRecebida") { 
				this.setState({ 
					isLoading: false,
					respostaFetchUsuario: ""
				}) 
			} else { this.setState({ respostaFetchUsuario: mensagem }) }
	}

	render() {
		const { modalAdicionarAberta, modalDeleteAberta, toolsList, nomeTool, isLoading, respostaFetchUsuario } = this.state;

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
							isLoading={ isLoading }
							respostaFetchUsuario={ respostaFetchUsuario }
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
//Quando adicionar mandar uma msg para o usuario.
//Mensagens de validação para erros de conexão, depois do loading do aperta do botão.
//Adicionar loading da lista.
//Falta fazer teste dos eventos addTag, removeTag e validação e loader do Addtool.js.
//Adicionar mensagem de lista vazia
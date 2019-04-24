import React, { Component, Suspense, lazy } from "react";
import Vuttr from "./componentes/Vuttr";
import ModalVuttr from "./componentes/ModalVuttr";
import Particles from "react-particles-js";
import particlesOptions from "./helpers/ParticlesOptions";
import SocialSVG from "./helpers/LinkedinSVG";
import LogoBossabox from "./helpers/icones/LogoBossabox.svg";
import './App.css';

const AddTool = lazy(() => import('./componentes/AddTool'));
const RemoveTool = lazy(() => import('./componentes/RemoveTool'));

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
    		respostaFetchUsuario: "",
    		respostaLista: "",
    		isLoadingLista: false,
  		};
	}

	componentDidMount() {
		this.getListaTools();
	}

	async getListaTools() {
		const dados =  await fetch("http://localhost:3000/tools", {
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
		this.loaderStatusLista();

		const dados =  await fetch(`http://localhost:3000/tools?q=${busca}`, {
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
			this.loaderStatusLista("mensagemRecebida");
		} else {
			this.loaderStatusLista("Falha ao carregar a lista, tente recarregar a página.");
		}	
	}

	async getListaToolsBuscaTag(tag) {
		this.loaderStatusLista();

		const dados =  await fetch(`http://localhost:3000/tools?tags_like=${tag}`, {
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
			this.loaderStatusLista("mensagemRecebida");
		} else {
			this.loaderStatusLista("Falha ao carregar a lista, tente recarregar a página.");
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
		if(refValue === "") { return; }
		
		this.setState({ tagFiltro: !this.state.tagFiltro }, () =>{
			this.pesquisaFiltradasTools(refValue);
		});
	}

	toggleModal () {
  		this.setState({ modalAdicionarAberta: !this.state.modalAdicionarAberta }, () => {
  			this.loaderStatus("mensagemRecebida");
  		});
	}

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

	async deleteTool() {
		const { toolIdDelete } = this.state;

		this.loaderStatus();

		const deleteStatus = await fetch(`http://localhost:3000/tools/${toolIdDelete}`,{
			method: "delete",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(resp => {
			this.getListaTools();

			return resp.status;	
		})
		.catch(error => console.log(error));

		if (deleteStatus === 200) { this.loaderStatus("Tool deletada com sucesso!") }
		else { this.loaderStatus("Falha ao deletar.") }
	}

	adicionarTool = async (form) => {
		this.loaderStatus();

		const addStatus = await fetch("http://localhost:3000/tools/",{
			method: "post",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form)      
		})
		.then(resp => {
			this.getListaTools();

			return resp.status;
		})
		.catch(error => console.log(error));

		if (addStatus === 201) { this.loaderStatus("Tool adicionada com sucesso!") }
		else { this.loaderStatus("Falha ao adicionar.") }
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

	//Adicionar teste.
	loaderStatusLista = (mensagem = "loading") => {
		if (mensagem === "loading") { this.setState({ isLoadingLista: true }) } 
			else if ( mensagem === "mensagemRecebida") { 
				this.setState({ 
					isLoadingLista: false,
					respostaLista: ""
				});
			} else { this.setState({ respostaLista: mensagem }) }
	}

	render() {
		const { modalAdicionarAberta, 
			modalDeleteAberta, 
			toolsList, 
			nomeTool, 
			isLoading, 
			respostaFetchUsuario,
			respostaLista,
			isLoadingLista 
		} = this.state;

		return(
			<div>
				<Particles className="particles" params={particlesOptions} />
				<Vuttr 
					abrirModal={() => this.toggleModal()} 
					abrirModalDelete={ this.toggleModalDelete }
					toolsList={ toolsList }
					ref={this.ref}
					pesquisaFiltradasTools={ this.pesquisaFiltradasTools }
					toggleTagFiltro={ this.toggleTagFiltro }
					isLoadingLista={ isLoadingLista }
					respostaLista={ respostaLista }
				/>
				{modalAdicionarAberta &&
					<ModalVuttr fecharModal={() =>this.toggleModal()}>
						<Suspense fallback={<div className="loader" ></div>}>
							<AddTool 
								fecharModal={() =>this.toggleModal()}
								adicionarTool={ this.adicionarTool }
								isLoading={ isLoading }
								respostaFetchUsuario={ respostaFetchUsuario }
							/>
						</Suspense>
					</ModalVuttr>
				}
				{modalDeleteAberta &&
					<ModalVuttr fecharModal={() =>this.toggleModalDelete()}>
						<Suspense fallback={<div className="loader" ></div>}>
							<RemoveTool 
								fecharModal={() =>this.toggleModalDelete()}
								deleteTool={() =>this.deleteTool()}
								nomeTool={ nomeTool }
								isLoading={ isLoading }
								respostaFetchUsuario={ respostaFetchUsuario }
							/>
						</Suspense>
					</ModalVuttr>
				}
				<footer className="pb4 ph3 ph5-ns tc">
					<a className="link near-black hover-silver dib h2 w2 mr3" href="https://github.com/yojimat" title="GitHub" target="blank">
    					<SocialSVG nomeSocial="GitHub"/>
  					</a>
  					<a className="link hover-silver near-black dib h2 w2 mr3" href="https://www.linkedin.com/in/vntc-fullstack/" title="Linkedin" target="blank">
    					<SocialSVG nomeSocial="Linkendin"/>
  					</a>
  					<br />
  					<small>Projeto realizado para desafio do Bossabox.</small><img src={LogoBossabox} alt="check" height="46" width="36"/> 
				</footer>
			</div>
		);
	}
}
export default App;
//Ideias:
//-Paginação
//-Favoritos
//-Nav bar responsiva
import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import LoadingComponent from "./LoadingComponent";
import LogoBossabox from "../helpers/icones/LogoBossabox.svg";
import './AddTool.css';

const modelTool = {
	title: "",
	link: "",
	description: "",
	tags: []
}

const tag = (index) => {
	return(
		<React.Fragment key={index}>
			<Field type="text" name={`tags[${index}]`} placeholder="Nome da Tag." className="mr0 	inputsAdd br1"/>
		</React.Fragment>
	);
}


const AddTool = ({...props }) => {
	const { 
		fecharModal, 
		adicionarTool,
		isLoading,
		respostaFetchUsuario
	} = props,
		[TagsHook, setTag] = useState([tag]),
		[nomeError, setnomeError] = useState(false),
		[linkError, setLinkError] = useState(false);

	const listaAddTags = () => TagsHook.map((tag, i) => tag(i));
	const adicionarTag = () => {
		setTag(() => {
			let tagList = TagsHook.concat(tag);
			return tagList;
		}) 
	}
	const removerTag = () => {
		setTag(() => {
			let tagListRemove = TagsHook.slice(0,TagsHook.length-1);
			return tagListRemove;
		}) 
	}
	const validacao = (values) => {
	    let errors = {};

		if (!values.title) {
			errors.title = "Insira o Nome da Tool.";
		}

		if (!values.link) {
			errors.link = "Insira um Link para Tool.";
		}

		return errors;
	}

	return(
		isLoading === true ?
		<LoadingComponent 
			respostaFetchUsuario={ respostaFetchUsuario }
			fecharModal={ () => fecharModal()}
		/>
		:
		<section className="addTool">
			<h1 className="azul-escuro">
				<img src={LogoBossabox} alt="check" height="70" width="60"/> Nova Tool:
			</h1>
			<Formik
	    		initialValues={ modelTool }
	    		validate={(values) => validacao(values)}
	    		onSubmit={(values, actions) => {
	    			adicionarTool(values)
	    			.then(status =>{
	    				actions.setSubmitting(false);
	    			});
	    		}}
	    		render={({ errors, touched, isSubmitting }) => (
		          	<Form className="ml3">
		          		<label>
				            Nome: {' '}
				        </label>
				        <Field type="text" name="title" 
				        	placeholder="Nome da Tool." 
				        	className={nomeError ? "inputsAddError br1" : "inputsAdd br1"}/>
				        <br />
				        {errors.title && touched.title ? 
           					[<small key="0" className="vermelho">{errors.title}<br /></small> , setnomeError(true)]	          
           				: 
           					setnomeError(false)
           				}			            
				        <br />
			            <label>
				            Link: {' '}
				        </label>
				        <Field type="text" 
				        	name="link" 
				        	placeholder="Link para a Tool." 
				        	className={linkError ? "mt2 inputsAddError br1" : "mt2 inputsAdd br1"} />
				        <br />
				        {errors.link && touched.link ? 
           					[<small key="0" className="vermelho">{errors.link}<br /></small> , setLinkError(true)]	          
           				: 
           					setLinkError(false)
           				}	 
			            <br />
			            <label>
				            Descrição: {' '}
				        </label>
				        <br />
				        <Field name="description" component="textarea" placeholder="Uma breve descrição da Tool." rows="4" cols="25" className="mb3 inputsAdd br1"/>
			            <br />
			            <label>
							Tags: {' '}	
			            </label>
			            <br />
			            {listaAddTags()}
			            <br />
			            <button type="button" 
			            	onClick={() => adicionarTag()}
			            	className="grow verde bg-white-verde mr2"
			            	style={{ fontSize: "75%"}}
			            >
							<span role="img" aria-label="plus">➕</span>
						</button>
						<button 
							type="button" 
							onClick={() => removerTag()}
							style={{ display: TagsHook.length > 1 ? "inline" : "none", fontSize: "75%" }}
							className="grow vermelho bg-remove"
						>
							<span role="img" aria-label="plus">➖</span>
						</button>
			            <br />
			            <button type="button" 
			            	onClick={fecharModal}
			            	className="mt3 br2 ph3 pv2 mb2 dib white mr4 bg-amarelo"
			            >
			            	<span>Voltar</span>
			            </button>
			            <button type="submit" 
			            	name="submit" 
			            	disabled={isSubmitting}
			            	className="br2 ph3 pv2 mb2 dib white bg-verde"
			            >
			              <span>Adicionar</span>
			            </button>
		          	</Form>
	          	)}
	    	/>
	    </section>
	);
}
export default AddTool;

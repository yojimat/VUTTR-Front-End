import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import LoadingComponent from "./LoadingComponent";

const modelTool = {
	title: "",
	link: "",
	description: "",
	tags: []
}

const tag = (index) => {
	return(
		<React.Fragment key={index}>
			<Field type="text" name={`tags[${index}]`} placeholder=" Nome da Tag." className="mr0 ba b--black-20"/>
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
		[TagsHook, setTag] = useState([tag]);

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
			errors.title = " Por favor, insira o Nome da Tool.";
		}

		if (!values.link) {
			errors.link = " Por favor, insira um Link para Tool.";
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
				<span role="img" aria-label="plus">➕</span>Nova Tool:
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
				            <Field type="text" name="title" placeholder=" Nome da Tool." className="ba b--black-20"/>
				            <br />
				            <ErrorMessage name="title">
				            	{msg => <span className="vermelho">{msg}<br /></span>}
				            </ErrorMessage> 
			            </label>
			            <br />
			            <label>
				            Link: {' '}
				        </label>
				        <Field type="text" name="link" placeholder=" Link para a Tool." className="mt2 ba b--black-20" />
				        <br />
				        <ErrorMessage name="link">
				           	{msg => <span className="vermelho">{msg}<br /></span>}
				        </ErrorMessage> 
			            <br />
			            <label>
				            Descrição: {' '}
				        </label>
				        <br />
				        <Field name="description" component="textarea" placeholder=" Uma breve descrição da Tool." rows="4" cols="25" className="mb3 ba b--black-20"/>
			            <br />
			            <label>
							Tags: {' '}	
			            </label>
			            <br />
			            {listaAddTags()}
			            <button type="button" 
			            	onClick={() => adicionarTag()}
			            	className="dim br-100 ph3 pv2 mb2 dib white bg-dark-green"
			            	style={{ fontSize: "75%"}}
			            >
							<span role="img" aria-label="plus">➕</span>
						</button>
						<button 
							type="button" 
							onClick={() => removerTag()}
							style={{ display: TagsHook.length > 1 ? "inline" : "none", fontSize: "75%" }}
							className="dim br-100 ph3 pv2 mb2 dib white bg-vermelho"
						>
							<span role="img" aria-label="plus">➖</span>
						</button>
			            <br />
			            <button type="button" 
			            	onClick={fecharModal}
			            	className="mt3 dim br3 ph3 pv2 mb2 dib black mr4 bg-amarelo"
			            >
			            	<span>Voltar</span>
			            </button>
			            <button type="submit" 
			            	name="submit" 
			            	disabled={isSubmitting}
			            	className="dim br3 ph3 pv2 mb2 dib black bg-verde"
			            >
			              <span>Adicionar?</span>
			            </button>
		          	</Form>
	          	)}
	    	/>
	    </section>
	);
}
export default AddTool;

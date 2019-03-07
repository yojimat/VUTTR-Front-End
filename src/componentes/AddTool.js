import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const modelTool = {
	title: "",
	link: "",
	description: "",
	tags: []
}

const tag = (index) => {
	return(
		<React.Fragment key={index}>
			<Field type="text" name={`tags[${index}]`} placeholder=" Nome da Tag."/>
		</React.Fragment>
	);
}


const AddTool = ({...props }) => {
	const { fecharModal, adicionarTool } = props;
	let Tags = [tag];
	const [TagsHook, setTag] = useState(Tags);

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
		<section>
			<h1>
				<span role="img" aria-label="plus">➕</span>Nova Tool:
			</h1>
			<Formik
	    		initialValues={ modelTool }
	    		validate={(values) => validacao(values)}
	    		onSubmit={(values, actions) => {
	    			adicionarTool(values)
	    			.then(tool =>{
	    				actions.setSubmitting(false);
	    				fecharModal();
	    			});
	    		}}
	    		render={({ errors, touched, isSubmitting }) => (
		          	<Form>
		          		<label>
				            Nome: {' '}
				            <Field type="text" name="title" placeholder=" Nome da Tool." />
				            <ErrorMessage name="title" component="span" />  
			            </label>
			            <br />
			            <label>
				            Link: {' '}
				            <Field type="text" name="link" placeholder=" Link para a Tool." />
				            <ErrorMessage name="link" component="span" />
			            </label>
			            <br />
			            <label>
				            Descrição: {' '}
				            <br />
				            <Field name="description" component="textarea" placeholder=" Uma breve descrição da Tool." />
			            </label>
			            <br />
			            <label>
							Tags: {' '}
							<br />
            				{listaAddTags()}	
			            </label>
			            <button type="button" onClick={() => adicionarTag()}>
							<span role="img" aria-label="plus">➕</span>
						</button>
						<button type="button" onClick={() => removerTag()}>
							<span role="img" aria-label="plus">➖</span>
						</button>
			            <br />
			            <button type="submit" name="submit" disabled={isSubmitting}>
			              Adicionar?
			            </button>
			            <button type="button" onClick={fecharModal}>Voltar</button>
		          	</Form>
	          	)}
	    	/>
	    </section>
	);
}
export default AddTool;

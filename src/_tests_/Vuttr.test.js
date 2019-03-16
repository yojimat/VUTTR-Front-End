import React from 'react';
import Vuttr from '../componentes/Vuttr';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

const abrirModal = jest.fn(),
	abrirModalDelete = jest.fn(),
	pesquisaFiltradasTools = jest.fn(),
	toggleTagFiltro = jest.fn(),
	defaultProps = {
		abrirModal,
		abrirModalDelete,
		toolsList: [],
		pesquisaFiltradasTools,
		toggleTagFiltro,
		ref: React.createRef()	
	}

const VuttrCriadorComponents = (props=defaultProps) =>{
	const VuttrDefaultComponent = mount(<><Vuttr {...props } /></>);
	return VuttrDefaultComponent;
}

describe(">>>Vuttr.js", () => {
	it("+Snapshot/Vuttr renderiza normalmente.", () => {  
	    const Vuttr = VuttrCriadorComponents();

	    expect(Vuttr).toMatchSnapshot();
	});

	it("+Verificando props toolsList", () => {
		const props = {
			toolsList: [{
	      		"id": 1,
		        "title": "Notion",
		        "link": "https://notion.so",
		        "description": "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
		        "tags": [
		        "organization",
		        "planning",
		        "collaboration",
		        "writing",
		        "calendar"
		     	]},
    			{
		      	"id": 2,
		      "title": "json-server",
		      "link": "https://github.com/typicode/json-server",
		      "description": "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.",
		      "tags": [
		        "api",
		        "json",
		        "schema",
		        "node",
		        "github",
		        "rest"
		      ]}
    		],
    		ref: React.createRef()
		},
			VuttrList = VuttrCriadorComponents(props).find("li");

		expect(VuttrList).toHaveLength(2);
		//Verifica lista tags, que com o modelo tem 11.
		expect(VuttrList.find("small")).toHaveLength(11);
		expect.assertions(2);
	});

	it("+Verificando evento ToogleDel", () => {
		const props = {
			toolsList: [{
	      		"id": 1,
		        "title": "Notion",
		        "link": "https://notion.so",
		        "description": "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
		        "tags": [
		        "organization",
		        "planning",
		        "collaboration",
		        "writing",
		        "calendar"
		     	]}
    		],
    		ref: React.createRef(),
			abrirModalDelete
		},
			VuttrEventDel = VuttrCriadorComponents(props).find("p + button");

		expect(VuttrEventDel).toHaveLength(1);
		VuttrEventDel.simulate('click', abrirModalDelete);
		expect(abrirModalDelete).toHaveBeenCalled();
		expect.assertions(2);
	});

	it("+Verificando evento ToogleAdd", () => {
		const VuttrEventAdd = VuttrCriadorComponents().find("button");

		expect(VuttrEventAdd).toHaveLength(1);
		VuttrEventAdd.simulate('click', abrirModal);
		expect(abrirModal).toHaveBeenCalled();
		expect.assertions(2);
	});

	it("+Verificando evento pesquisaFiltradasTools", () => {
		const VuttrEventPesquisaFiltrada = VuttrCriadorComponents().find("input[type='search']");

		expect(VuttrEventPesquisaFiltrada).toHaveLength(1);
		VuttrEventPesquisaFiltrada.simulate("change", pesquisaFiltradasTools);
		expect(pesquisaFiltradasTools).toHaveBeenCalled();
		expect.assertions(2);
	});

	it("+Verificando evento toggleTagFiltro", () => {
		const VuttrEventToggleTagFiltro = VuttrCriadorComponents().find("input[type='checkbox']");

		expect(VuttrEventToggleTagFiltro).toHaveLength(1);
		VuttrEventToggleTagFiltro.simulate("change", toggleTagFiltro);
		expect(toggleTagFiltro).toHaveBeenCalled();
		expect.assertions(2);
	});
});
import React from 'react';
import App from '../App';
import Renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

const fetchCallMock = () => {
	const mockSuccessResponse = [{
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
		        ]
			}],
    		mockJsonPromise = Promise.resolve(mockSuccessResponse),
    		mockFetchPromise = Promise.resolve({
      			json: () => mockJsonPromise,
    		});
    return mockFetchPromise;
}


describe(">>>App.js", () => {
	it("+App renderiza normalmente.", () => {
  		const appContainer = Renderer.create(<App />).toJSON();
  		expect(appContainer).toMatchSnapshot();
	});

	it("+Verificando ToggleModalAdd", () =>{
		const appToggle = mount(<App />);

		expect.assertions(3);
		expect(appToggle.state("modalAdicionarAberta")).toBe(false);
		appToggle.find("button").simulate('click');
		expect(appToggle.state("modalAdicionarAberta")).toBe(true);
		expect(appToggle.find(".addTool")).toHaveLength(1);
	});

	it("+Verificando ToggleModalRemove", () =>{
		const appToggleRemove = mount(<App />);

		expect.assertions(6);
		expect(appToggleRemove.state("toolsList")).toEqual([]);
		expect(appToggleRemove.state("modalDeleteAberta")).toBe(false);
		appToggleRemove.setState({ 
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
		        ]
			}]
		});
		expect(appToggleRemove.state("toolsList")).not.toEqual([]);
		expect(appToggleRemove.find("button[id=1]")).toHaveLength(1);
		appToggleRemove.find("button[id=1]").simulate('click');
		expect(appToggleRemove.state("modalDeleteAberta")).toBe(true);
		expect(appToggleRemove.find(".removeTool")).toHaveLength(1);
	});

	it("+Verificando se compenentDidMount chama getListaTools",() => {
		const spy = jest.spyOn(App.prototype, 'getListaTools'),
			appGetLista = mount(<App />);

		expect.assertions(2);
		expect(spy).toHaveBeenCalled();
		expect(spy).toHaveBeenCalledTimes(1);

		spy.mockClear();
	});

	it("+Verificando método getListaTools e state toolsList", done => {
  		const fetchCall = fetchCallMock(),
    		appGetListaTools = mount(<App />);

  		jest.spyOn(global, 'fetch').mockImplementation(() => fetchCall);

  		expect.assertions(4);
		expect(appGetListaTools.state().toolsList).toEqual([]);

		appGetListaTools.instance().getListaTools();

    	expect(global.fetch).toHaveBeenCalledWith("/tools",{"headers": {"Content-Type": "application/json"}, "method": "get"});
		expect(global.fetch).toHaveBeenCalledTimes(1);

		process.nextTick(() => {
			expect(appGetListaTools.state().toolsList).not.toEqual([]);

			global.fetch.mockClear();
			done();
		});	
	});

	it("+Verificando método getListaToolsBuscaGlobal", done =>{
		const fetchCallGlobal = fetchCallMock(),
    		appGetListaToolsGlobal = mount(<App />);

    	jest.spyOn(global, 'fetch').mockImplementation(() => fetchCallGlobal)

  		expect.assertions(4);
		expect(appGetListaToolsGlobal.state().toolsList).toEqual([]);

		appGetListaToolsGlobal.instance().getListaToolsBuscaGlobal("Notion");

    	expect(global.fetch).toHaveBeenCalledWith("/tools?q=Notion",{"headers": {"Content-Type": "application/json"}, "method": "get"});
    	//2 por causa do fetch do componentDidMount.
		expect(global.fetch).toHaveBeenCalledTimes(2);

		process.nextTick(() => {
			expect(appGetListaToolsGlobal.state().toolsList).not.toEqual([]);

			global.fetch.mockClear();
			done();
		});	
	});

	it("+Verificando método getListaToolsBuscaTag", done =>{
		const fetchCallTag = fetchCallMock(),
    		appGetListaToolsTag = mount(<App />);

    	jest.spyOn(global, 'fetch').mockImplementation(() => fetchCallTag)

  		expect.assertions(4);
		expect(appGetListaToolsTag.state().toolsList).toEqual([]);

		appGetListaToolsTag.instance().getListaToolsBuscaTag("organization");

    	expect(global.fetch).toHaveBeenNthCalledWith(2,"/tools?tags_like=organization",{"headers": {"Content-Type": "application/json"}, "method": "get"});
    	//2 por causa do fetch do componentDidMount.
		expect(global.fetch).toHaveBeenCalledTimes(2);

		process.nextTick(() => {
			expect(appGetListaToolsTag.state().toolsList).not.toEqual([]);

			global.fetch.mockClear();
			done();
		});	
	});

	it("+Verificando pesquisaFiltradasTools", () => {
		const appPesquisaFiltradasTools = mount(<App />),
			spyTag = jest.spyOn(App.prototype, 'getListaToolsBuscaTag'),
			spyGlobal = jest.spyOn(App.prototype, 'getListaToolsBuscaGlobal');

		expect(spyGlobal).toHaveBeenCalledTimes(0);

		appPesquisaFiltradasTools.instance().pesquisaFiltradasTools("jest");

		expect(spyGlobal).toHaveBeenCalled();
		expect(spyGlobal).toHaveBeenCalledTimes(1);

		expect(spyTag).toHaveBeenCalledTimes(0);

		appPesquisaFiltradasTools.setState({ tagFiltro: true });
		appPesquisaFiltradasTools.instance().pesquisaFiltradasTools("jest");

		expect(spyTag).toHaveBeenCalled();
		expect(spyTag).toHaveBeenCalledTimes(1);
	});

	it("+Verificando toggleTagFiltro", () => {
		const apptoggleTagFiltro = mount(<App />),
			spypesquisaFiltradasTools = jest.spyOn(apptoggleTagFiltro.instance(), 'pesquisaFiltradasTools');

		//Force Update para o jest entender que pesquisaFiltradasTools é uma função.
		apptoggleTagFiltro.instance().forceUpdate();

		expect(spypesquisaFiltradasTools).toHaveBeenCalledTimes(0);
		expect(apptoggleTagFiltro.state("tagFiltro")).toBe(false);

		apptoggleTagFiltro.instance().toggleTagFiltro("jest");

		expect(apptoggleTagFiltro.state("tagFiltro")).toBe(true);
		expect(spypesquisaFiltradasTools).toHaveBeenCalled();
		expect(spypesquisaFiltradasTools).toHaveBeenCalledTimes(1);
	});
});

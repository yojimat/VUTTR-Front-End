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

    	expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/tools",{"headers": {"Content-Type": "application/json"}, "method": "get"});
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

    	expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/tools?q=Notion",{"headers": {"Content-Type": "application/json"}, "method": "get"});
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

    	expect(global.fetch).toHaveBeenNthCalledWith(2,"http://localhost:3000/tools?tags_like=organization",{"headers": {"Content-Type": "application/json"}, "method": "get"});
    	//2 por causa do fetch do componentDidMount.
		expect(global.fetch).toHaveBeenCalledTimes(2);

		process.nextTick(() => {
			expect(appGetListaToolsTag.state().toolsList).not.toEqual([]);

			global.fetch.mockClear();
			done();
		});	
	});

	it("+Verificando método pesquisaFiltradasTools", () => {
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
		spyTag.mockClear();
		spyGlobal.mockClear();
	});

	it("+Verificando método toggleTagFiltro", () => {
		const appToggleTagFiltro = mount(<App />),
			spyPesquisaFiltradasTools = jest.spyOn(appToggleTagFiltro.instance(), 'pesquisaFiltradasTools');

		//Force Update para o jest entender que pesquisaFiltradasTools é uma função.
		//appToggleTagFiltro.instance().forceUpdate();

		expect(spyPesquisaFiltradasTools).toHaveBeenCalledTimes(0);
		expect(appToggleTagFiltro.state("tagFiltro")).toBe(false);

		appToggleTagFiltro.instance().toggleTagFiltro("jest");

		expect(appToggleTagFiltro.state("tagFiltro")).toBe(true);
		expect(spyPesquisaFiltradasTools).toHaveBeenCalled();
		expect(spyPesquisaFiltradasTools).toHaveBeenCalledTimes(1);
	});

	it("+Verificando método deleteTool.", () => {
		const fetchCallDeleteTool = fetchCallMock(),
    		appDeleteTool = mount(<App />);

    	appDeleteTool.setState({ toolIdDelete: 1 });	
    	jest.spyOn(global, 'fetch').mockImplementation(() => fetchCallDeleteTool);

    	appDeleteTool.instance().deleteTool();

    	expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/tools/1",{"headers": {"Content-Type": "application/json"}, "method": "delete"});

    	global.fetch.mockClear();
	});

	it("+Verificando método adicionarTool.", () => {
		const fetchCallAdicionarTool = fetchCallMock(),
			appAdicionarTool = mount(<App />),
			form = {
				description: "Testando com Jest",
				link: "test.com",
				tags: ["jest", "enzyme"],
				title: "Jest"
			};

		jest.spyOn(global, 'fetch').mockImplementation(() => fetchCallAdicionarTool);

		appAdicionarTool.instance().adicionarTool();

		expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/tools/",{"headers": {"Content-Type": "application/json"}, "method": "post"});

		global.fetch.mockClear();
	});
});
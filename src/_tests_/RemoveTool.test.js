import React from 'react';
import RemoveTool from '../componentes/RemoveTool';
import renderer from 'react-test-renderer';
import { mount, render } from 'enzyme';

const fecharModal = jest.fn(),
	deleteTool = jest.fn(),
	defaultProps = {
		nomeTool: "",
		fecharModal,
		deleteTool
	};

const RemoveToolCriadorComponents = (props=defaultProps) =>{
	const RemoveToolDefaultComponent = mount(<RemoveTool {...props } />);
	return RemoveToolDefaultComponent;
}

describe(">>>RemoveTool.js", () => {
	it("+RemoveTool renderiza normalmente.", () => {
  		const RemoveToolComponent = renderer.create(<RemoveTool />).toJSON();

  		expect(RemoveToolComponent).toMatchSnapshot();
	});

	it("+Verificando default props", () => {
		const RemoveToolComponent = RemoveToolCriadorComponents();

		expect(RemoveToolComponent.prop('nomeTool')).toEqual("");
		expect(RemoveToolComponent.prop('fecharModal')).toEqual(fecharModal);
		expect(RemoveToolComponent.prop('deleteTool')).toEqual(deleteTool);
		expect.assertions(3);
	});

	it("+Verificando valor nomeTool", ()=>{
		const props = {
			nomeTool: "GitHub"
		},
		RemoveToolComponentPTag = RemoveToolCriadorComponents(props).find("p");

		expect(RemoveToolComponentPTag).toHaveLength(1);
		expect(RemoveToolComponentPTag.text()).toMatch(props.nomeTool);
		expect.assertions(2);
	});

	it("+Verificando evento fechar Modal", () =>{
		const RemoveToolComponentCancelar = RemoveToolCriadorComponents().find('p + button');
    	RemoveToolComponentCancelar.simulate('click', fecharModal);
    	expect(fecharModal).toHaveBeenCalled();
	});

	it("+Verificando evento deleteTool", () =>{
		const RemoveToolComponentDel = RemoveToolCriadorComponents().find('button + button');
    	RemoveToolComponentDel.simulate('click', deleteTool);
    	expect(deleteTool).toHaveBeenCalled();
	});

	it("+Verificando evento isLoading", () => {
		const propsLoading = {
			isLoading: true,
			respostaFetchUsuario: "",
			fecharModal
		};
		const removeToolLoading = render(<RemoveTool{...propsLoading } />);
		
		expect(removeToolLoading).toMatchSnapshot();
	});
});
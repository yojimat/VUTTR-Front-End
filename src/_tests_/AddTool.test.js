import React from 'react';
import AddTool from '../componentes/AddTool';
import LoadingComponent from '../componentes/LoadingComponent';
import renderer from 'react-test-renderer';
import { mount, render } from 'enzyme';

const fecharModal = jest.fn(),
	adicionarTool = jest.fn(() => {
		return Promise.resolve(fecharModal());
	}),
	defaultProps = {
		fecharModal,
		adicionarTool,
		isLoading: false,
		respostaFetchUsuario: ""
	};

const AddToolCriadorComponents = (props=defaultProps) =>{
	const ModalVuttrDefaultComponent = mount(<AddTool{...props } />);
	return ModalVuttrDefaultComponent;
}

describe(">>>AddTool.js", () => {
	it("+Snapshot/AddTool renderiza normalmente.", () => {  
	    const AddToolDefaultComponent = render(<AddTool{...defaultProps } />);

	    expect(AddToolDefaultComponent).toMatchSnapshot();
	});

	it("+Verificando evento fecharModal", () => {
		const AddToolDel = AddToolCriadorComponents().find("button:last-child");

		expect(AddToolDel).toHaveLength(1);
		AddToolDel.simulate('click', fecharModal);
		expect(fecharModal).toHaveBeenCalled();
		expect.assertions(2);
	});

	it("+Verificando evento submit", () => {
		const AddtoolForm =  AddToolCriadorComponents().find("Formik"),
			instancia = AddtoolForm.instance();

		instancia.props.onSubmit();
		expect.assertions(2);
		expect(adicionarTool).toHaveBeenCalled();
		expect(fecharModal).toHaveBeenCalled();
	});

	it("+Verificando evento isLoading", () => {
		const propsLoading = {
			isLoading: true,
			respostaFetchUsuario: "",
			fecharModal
		};
		const AddToolLoading = render(<AddTool{...propsLoading } />);
		
		expect(AddToolLoading).toMatchSnapshot();
	});
});
import React from 'react';
import ModalVuttr from '../componentes/ModalVuttr';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

const fecharModal = jest.fn(),
	defaultProps = {
		fecharModal
	};

const ModalVuttrCriadorComponents = (props=defaultProps) =>{
	const ModalVuttrDefaultComponent = mount(<ModalVuttr{...props }><div /></ModalVuttr>);
	return ModalVuttrDefaultComponent;
}

describe(">>>ModalVuttr.js", () => {
	it("+Snapshot/ModalVuttr renderiza normalmente.", () => {  
	    const ModalVuttrComponent = ModalVuttrCriadorComponents();

	    expect(ModalVuttrComponent).toMatchSnapshot();
	});

	it("+Verificando default props", () => {  
	   	const ModalVuttrComponentProps = ModalVuttrCriadorComponents();

	    expect(ModalVuttrComponentProps.prop("fecharModal")).toEqual(fecharModal);
	});
	
	it("+Vericando eventos listenerOutsideClick e pressionarButton.", () => {
		const ModalVuttrComponentModalEvents = ModalVuttrCriadorComponents(),
			e = ModalVuttrComponentModalEvents.find(".modal"),
			ebutton = { 
				keyCode: 27,
				preventDefault: jest.fn()
			},
			instancia = ModalVuttrComponentModalEvents.instance();

		instancia.listenerOutsideClick(e);
    	expect(fecharModal).toHaveBeenCalled();

    	instancia.pressionarButton(ebutton);
    	expect(fecharModal).toHaveBeenCalledTimes(2);

    	expect.assertions(2);
    	ModalVuttrComponentModalEvents.unmount();
	});
});
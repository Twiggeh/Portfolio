/** @type {{modal : import('../Modals/modal_index').Modal, setModal: function}} */
const MODAL_DEFAULT = {
	modal: undefined,
	setModal: () => {},
};
const ModalContext = createContext(MODAL_DEFAULT);

export default ModalContext;
import { createContext } from 'react';

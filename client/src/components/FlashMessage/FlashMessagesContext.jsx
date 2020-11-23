import { createContext } from 'react';

/**
 * @type {{
 *  setFlashMessages: function(
 * 			function(import('./FlashMessages').FlashMessage
 * 		):import('../../App').AddFlashMessageInput
 *  ):void,
 * 	addFlashMessages: function(import('../../App').AddFlashMessageInput):void
 * }}
 */
/**
 * @type {}
 */
const DEFAULT_FLASH_MESSAGES_CONTEXT = {
	setFlashMessages: () => {},
	addFlashMessages: () => {},
};

export default createContext(DEFAULT_FLASH_MESSAGES_CONTEXT);

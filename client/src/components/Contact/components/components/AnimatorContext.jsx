import { createContext } from 'react';
/** 
  @type {{
    animStore: import("./useAnimator").AnimStore,
    animate: function(
      import("./useAnimator").AnimActions
    ):void,
    getCss: function(string):string
	}}  
	*/
const DEFAUTLT_ANIMATOR_DATA = {
	animStore: {},
	animate: () => {},
	getCss: () => {},
};
const AnimatorData = createContext(DEFAUTLT_ANIMATOR_DATA);

export default AnimatorData;

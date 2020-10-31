import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

const Animator = ({ children }) => {
	children.forEach(child => {
		if (child.key === null) {
			console.log('Does not contain a key', child);
			throw new Error('All Animated Elements must contain a key.');
		}
	});

	/**@type {AnimatorTree} */
	const reference = {
		Form: {
			children: {
				Label: {
					children: undefined,
					AnimationState: {
						customCss: 'transition: transform 250ms ease-in-out',
					},
				},
				Select: {
					children: {
						SelectorsSelect: {
							children: undefined,
							AnimationState: {
								customCss: 'transition: transform 250ms ease-in-out',
							},
							ChildrenOrder: [],
						},
					},
					AnimationState: {
						customCss: 'transition: transform 250ms ease-in-out',
					},
					ChildrenOrder: [],
				},
			},
			parent: undefined,
			ChildrenOrder: ['hello'],
			AnimationState: {
				customCss: 'transition: transform 250ms ease-in-out',
			},
		},
		// TODO : Maybe add a map to find elements faster map : { Label : ["Form"], SelectorsSelect : ["Form", "Select"] }
	};

	/**
	 * Validates the children to be an array, sets a root element if necessary.
	 * @param {Array} children
	 * @param {Object | undefined} parent
	 * @return {AnimatorTree}
	 */
	const buildTreeSat = (children, parent) => {
		const addTreeEntry = (tree, name, parentRef, children, AnimationState = '') => {
			const entry = {
				parent: parentRef,
				children,
				AnimationState,
			};
			if (tree[name]?.children) {
				entry.children = { ...tree[name].children, ...entry.children };
			}
			tree[name] = entry;
		};

		const buildTree = (children, parent) => {
			const tree = {};

			for (let child of children) {
				if (typeof child.props.children === 'object') {
					// TODO : Add ChildrenOrder
					const subTree = buildTree(child.props.children, tree);
					addTreeEntry(tree, child.key, parent, subTree);
					continue;
				}
				addTreeEntry(tree, child.key, parent);
			}

			return tree;
		};

		let rootIsFirstElement = false;

		const root = { root: { children: {}, AnimationState: '', ChildrenOrder: [] } };

		if (!Array.isArray(children)) children = [children];
		if (children.length === 0) throw new Error('Cannot animate 0 elements');
		if (!parent && children.length !== 1) parent = root;
		if (!parent && children.length === 1) rootIsFirstElement = true;

		const result = buildTree(children, parent);

		if (rootIsFirstElement) {
			result[children[0].key].parent = result;
		}

		return result;
	};

	const initialAnimTree = buildTreeSat(children);

	/**
	 * @param {AnimatorTree} tree
	 * @param {AnimatorElKey} key
	 * @return {AnimatorTree}
	 */
	const findElement = (tree, key) => {
		if (tree.map) {
			// TODO : Add map;
		}
		const recursiveSearch = tree => {
			const treeKeys = Object.keys(tree);

			for (const treeKey of treeKeys) {
				if (treeKey === key) {
					return tree[key];
				}
			}

			for (const treeKey of treeKeys) {
				if (tree[treeKey].children === undefined) continue;
				const result = recursiveSearch(tree[treeKey]);

				if (result) {
					return result;
				}
			}
		};

		const result = recursiveSearch(tree);
		if (!result) throw new Error(`Could not find key: ${key}`);
	};

	/**
	 * @param {AnimatorTree} animTree
	 * @param {AnimatorAction} action
	 */
	const reducer = (animTree, action) => {
		switch (action.type) {
			case 'setSiblings': {
				const element = findElement(animTree, action.key)[action.key];
				element.parent[];
				return { ...animTree };
			}
			case 'setParent': {
			}
			case 'setChildren': {
			}
			default:
				throw new Error(`Unsupported action type ${action.type}`);
		}
	};

	const [animTree, animate] = useReducer(reducer, initialAnimTree);

	// return useAnimator hook
	return (
		<>
			{children.map(child => {
				console.log(child);
			})}
			{children}
		</>
	);
};

Animator.propTypes = {
	children: PropTypes.array,
};

export default Animator;

//TODO : add key to all elements
/** 
	 * @typedef {string} AnimatorElKey 
	 * @typedef {
		Object.<string, {
			children: AnimatorTree | undefined,
			parent: AnimatorTree | undefined, 
			AnimationState: {
				customCss: string | undefined,
			} 
			ChildrenOrder: Array.<AnimatorElKey> | undefined,
			key: AnimatorElKey,
		}>} AnimatorTree
	*	@typedef {
			{ type: "setSiblings" | "setParent" | "setChildren",
			customCss: String,
			key: AnimatorElKey
			}} AnimatorAction
 */

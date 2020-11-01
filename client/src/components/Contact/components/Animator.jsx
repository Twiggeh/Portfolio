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
		const entryFactory = (parent, children, key, AnimationState = '') => ({
			parent,
			key,
			children,
			AnimationState,
		});

		const addEntryToTree = (tree, name, entry) => {
			if (tree[name]?.children) {
				entry.children = { ...tree[name].children, ...entry.children };
			}
			tree[name] = entry;
			return entry;
		};

		const addTreeEntry = (tree, name, parent, children, AnimationState) => {
			const entry = entryFactory(parent, children, name, AnimationState);
			return addEntryToTree(tree, name, entry);
		};

		const buildTree = (children, parent, tree = {}) => {
			// if children not array make them to an array
			if (!Array.isArray(children)) children = [children];
			// get each child

			for (let child of children) {
				if (typeof child.props.children === 'object') {
					// create new entry in the tree, so that a correct parent can be passed to the sub tree
					const entry = addTreeEntry(tree, child.key, parent);
					// create the children of the current child
					const subTree = buildTree(child.props.children, entry);
					// assign the children of the previously created entry
					entry.children = subTree;
					continue;
				}
				// if child doesnt have children we just append the child to the current tree
				addTreeEntry(tree, child.key, parent);
			}
			return tree;
		};

		let firstElIsRoot = false;
		let injectRoot = false;

		const root = { children: {}, AnimationState: '', ChildrenOrder: [], key: 'root' };

		if (!Array.isArray(children)) children = [children];
		if (children.length === 0) throw new Error('Cannot animate 0 elements');
		if (!parent && children.length !== 1) {
			injectRoot = true;
			parent = root;
		}
		if (!parent && children.length === 1) firstElIsRoot = true;

		const result = buildTree(children, parent);

		// Set roots
		if (firstElIsRoot) result[children[0].key].parent = result;
		if (injectRoot) root.children = result;

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
				console.log(element);
				return { ...animTree };
			}
			case 'setParent': {
				return;
			}
			case 'setChildren': {
				return;
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

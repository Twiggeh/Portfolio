/** @type {Fetch}  */
const useFetch = (
	url,
	{
		fetchOptions = { method: 'GET' },
		hookOptions: { dep = undefined, condition = true, parser = 'json' } = {
			dep: undefined,
			condition: true,
			parser: 'json',
		},
		callbacks: { finalCb, successCb, failCb } = {},
	}
) => {
	const isMounted = useRef(true);
	useEffect(() => () => (isMounted.current = false), []);

	const initFState = {
		res: undefined,
		loading: false,
		error: false,
	};

	const FStateReducer = (state, action) => {
		switch (action.type) {
			case 'loading':
				return { ...state, loading: true };
			case 'error':
				return { res: undefined, loading: false, error: action.payload };
			case 'setData':
				return { res: action.payload, loading: false, error: false };
		}
	};
	const [fState, fDispatch] = useReducer(FStateReducer, initFState);

	// Fetches Lobbies and refreshes
	useEffect(() => {
		if (!condition) return;
		const fetchData = async () => {
			fDispatch({ type: 'loading' });

			const result = [];

			try {
				if (!isMounted.current) return;

				let rawRes;
				try {
					rawRes = await fetch(url, fetchOptions);
				} catch (e) {
					console.log('fetch threw', e);
				}
				if (!rawRes.ok) throw rawRes.statusText;

				let res;
				switch (parser) {
					case 'string':
						res = await rawRes.text();
						break;
					case 'json':
						res = await rawRes.json();
						break;
				}

				fDispatch({ type: 'setData', payload: res });

				if (successCb) successCb(res);
				result[0] = res;
			} catch (e) {
				if (!isMounted.current) return;

				fDispatch({ type: 'error', payload: e });

				if (failCb) failCb(e);
				result[1] = e;
			}

			if (!isMounted.current) return;

			if (finalCb) finalCb(...result);
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dep, condition]);

	return fState;
};
export default useFetch;

/**
 @typedef {(
	url: string,
	options?: {
		fetchOptions?: {
			method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'UPDATE';
			mode?: 'cors' | 'no-cors' | 'cors' | 'same-origin';
			cache?:
				| 'no-cache'
				| 'default'
				| 'no-cache'
				| 'reload'
				| 'force-cache'
				| 'only-if-cached';
			credentials?: 'same-origin' | 'include' | 'same-origin' | 'omit';
			headers?: {
				'Content-Type'?: 'application/json' | 'application/x-www-form-urlencoded';
			};
			redirect: 'follow' | 'manual' | 'follow' | 'error';
			referrerPolicy:
				| 'no-referrer'
				| 'no-referrer'
				| 'no-referrer-when-downgrade'
				| 'origin'
				| 'origin-when-cross-origin'
				| 'same-origin'
				| 'strict-origin'
				| 'strict-origin-when-cross-origin'
				| 'unsafe-url';
			body: string
		};
		hookOptions?: {
			condition?: boolean | null;
			dep?: string | number | boolean;
			parser?: 'json' | 'string';
		};
		callbacks?: {
			finalCb?: () => void;
			successCb?: () => void;
			failCb?: () => void;
		};
  }) =>  {
    res: any;
    error: string | object;
    loading: boolean;
  }} Fetch
  */

import { useReducer, useEffect, useRef } from 'react';

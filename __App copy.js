import React, { useEffect, useReducer } from 'react';
import './App.css';
import Page from './component/Page'

const MODE = {
	OPENING : 'OPENING',
	OPENING_ACTIVE : 'OPENING_ACTIVE',
	CLOSING : 'CLOSING',
	CLOSING_ACTIVE : 'CLOSING_ACTIVE',
	CLOSED : 'CLOSED',
};
const ACTION = {
	CLICK : 'CLICK',
	OPENING_ACTIVE : 'OPENING_ACTIVE',
	CLOSING_ACTIVE : 'CLOSING_ACTIVE',
	CLOSING_DONE : 'CLOSING_DONE',
};
const TARGET = {
	OPEN: 'OPEN',
	CLOSED: 'CLOSED',
};
const PAGE_CLASS = {
	OPENING : 'nav--enter',
	OPENING_ACTIVE : 'nav--enter nav--enter-active',
	CLOSING : 'nav--leave',
	CLOSING_ACTIVE : 'nav--leave nav--leave-active',
	CLOSED : '',
};
const initialState = {
	target: TARGET.CLOSED,
	mode: MODE.CLOSED,
};

const reducer = (state, action) => {
	const newState = {...state};

	switch (action.type) {
		case ACTION.CLICK:
			newState.target = (state.target === TARGET.OPEN) ? TARGET.CLOSED : TARGET.OPEN;
			newState.mode = (newState.target === TARGET.OPEN) ? MODE.OPENING : MODE.CLOSING;

			return newState;

		case ACTION.OPENING_ACTIVE:
			newState.mode = MODE.OPENING_ACTIVE;

			return newState;

		case ACTION.CLOSING_ACTIVE:
			newState.mode = MODE.CLOSING_ACTIVE;

			return newState;

		case ACTION.CLOSING_DONE:
			newState.mode = MODE.CLOSED;

			return newState;

		default:
			throw new Error('Reducer action not found: ' + action);
	}
};

const CLOSING_ANIMATION_DURATION = 1020;

function App () {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(
		() => {
			if (state.target === TARGET.OPEN) {
				document.body.classList.add('no-scroll');
		}

			return () => document.body.classList.remove('no-scroll');
		},
		[state]
	);

	switch (state.mode) {
		case MODE.OPENING:
				window.requestAnimationFrame(() => dispatch({type: ACTION.OPENING_ACTIVE}));
			break;
		case MODE.CLOSING:
				window.requestAnimationFrame(() => dispatch({type: ACTION.CLOSING_ACTIVE}));
			break;
		case MODE.CLOSING_ACTIVE:
				setTimeout(() => dispatch({type: ACTION.CLOSING_DONE}), CLOSING_ANIMATION_DURATION);
			break;
		default:
	}

	const pageClassName = PAGE_CLASS[state.mode] ? 'page ' + PAGE_CLASS[state.mode] : 'page';

	function navClickHandler () {
		dispatch({type: ACTION.CLICK});
	}

	return (
		<div className={pageClassName}>
			<header className="header-nav">
				<nav className="header-nav__inner" role="navigation">
					<div className="header-nav__auxiliary">
						<div className="header-nav__logo">
							<a href="/">logo</a>
						</div>
						<button className="header-nav__button" onClick={navClickHandler}>show / hide menu</button>
					</div>
					<div className="header-nav__links">
						<div className="header-nav__links-inner">
							<a href="/">Link A</a>
							<a href="/">Link B</a>
							<a href="/">Link C</a>
							<a href="/">Link D</a>
						</div>
					</div>
				</nav>
			</header>
			<main className="page__main baseline">
				<section className="section">
					<div className="inner section__inner">
						<h1>Opening &amp; closing navigation menu</h1>
						<pre>{ state.target }</pre>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							facilisis elit finibus, pharetra sem vitae, accumsan leo. Praesent
							a dui lectus.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							facilisis elit finibus, pharetra sem vitae, accumsan leo. Praesent
							a dui lectus.
						</p>
						<ol>
							<li>A The quick brown fox jumps over the lazy dog</li>
							<li>B The quick brown fox jumps over the lazy dog</li>
							<li>C The quick brown fox jumps over the lazy dog</li>
						</ol>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							facilisis elit finibus, pharetra sem vitae, accumsan leo. Praesent
							a dui lectus.
						</p>
					</div>
				</section>
			</main>
			<footer className="footer">
				<div className="inner footer__inner">Footer</div>
			</footer>

			<div id="overlay" className="overlay"></div>

			<Page>P A G E</Page>
		</div>
	);
}

export default App;

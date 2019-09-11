import React from 'react';
import './App.css';
import Page from './component/Page'
import './component/footer.css';
import './component/inner.css';
import './component/section.css';

function App () {
	return (
		<Page>
			<div className="page__outline">
				<main className="page__main baseline">
					<section className="section">
						<div className="inner section__inner">
							<h1>Opening &amp; closing navigation menu</h1>
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
			</div>
		</Page>
	);
}

export default App;

// ==UserScript==
// @name        GitHub
// @namespace   ltguillaume
// @description CSS, prevent . from opening devmode, F10 to open on Codeberg
// @author      ltGuillaume
// @version     2.5.9
// @icon        https://github.com/favicon.ico
// @match       *://*.github.com/*
// @grant       GM_addStyle
// @grant       GM_openInTab
// !grant       window.close
// @run-at      document-start
// ==/UserScript==

GM_addStyle(`

:root[data-color-mode="light"] {
	--color-canvas-default: var(--color-scale-gray-1) !important;
	--color-codemirror-bg:  var(--color-scale-gray-0) !important;
/*
	--color-canvas-subtle:  var(--color-scale-gray-2);
	--color-canvas-overlay: var(--color-scale-gray-1);
	--color-project-sidebar-bg: var(--color-scale-gray-1);
	--color-project-gradient-in: var(--color-scale-gray-1);
	--color-avatar-bg: var(--color-scale-gray-1);
	--color-header-logo: var(--color-scale-gray-1);
*/
}

:root[data-color-mode="light"] table,
:root[data-color-mode="light"] .Box-body,
:root[data-color-mode="light"] .comment,
:root[data-color-mode="light"] .js-snippet-clipboard-copy-unpositioned,
:root[data-color-mode="light"] .markdown-body img {
	background-color: var(--color-scale-gray-0) !important;
}

.markdown-body .highlight pre,
.markdown-body pre {
	background-color: var(--color-scale-gray-1) !important;
}

`);

function removeHotkeys() {
	let repo, el;
	if (repo = document.querySelector('.repository-content'))
		repo.addEventListener('DOMNodeInserted', removeHotkeys);

	for (q of ['.js-github-dev-shortcut', '.js-github-dev-new-tab-shortcut'])
		if (el = document.querySelector(q)) {
			el.remove();
			console.log('Hotkey', q, 'removed');
			repo.removeEventListener('DOMNodeInserted', removeHotkeys);
			clearInterval(removeHotkeysInterval);
		}
}

let removeHotkeysInterval = setInterval(removeHotkeys, 200);

document.addEventListener('keydown', e => {
	if (e.key == 'F10') {
		e.preventDefault();
		let url = document.URL
			.replace('github.com', 'codeberg.org')
			.replace('/commits/', '/commits/branch/')
			.replace('/tree/', '/src/branch/');
		GM_openInTab(url, { active: true, insert: true });
//	window.close();
	}
});
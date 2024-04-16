async function initMocks() {
	if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') return;

	if (typeof window === 'undefined') {
		console.log('mock server execute @@@@@@@@@@@');

		const { server } = await import('../msw/server.ts');
		server.listen();
	} else {
		const { worker } = await import('../msw/browser.ts');
		worker.start();
	}
}

initMocks();

export {};

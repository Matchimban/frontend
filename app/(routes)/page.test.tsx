import { render, screen } from '@testing-library/react';

import Home from '@/app/(routes)/page';

describe('Home', () => {
	test('render', () => {
		render(<Home />);
		expect(
			screen.getByRole('heading', {
				name: /matchimban/i,
			}),
		).toBeInTheDocument();
	});
});

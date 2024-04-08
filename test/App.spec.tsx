import React from 'react';
import { cleanup, render } from '@testing-library/react';

import App from '../src/App';

describe('App', () => {
    const setupTests = () => {
        const app = render(<App />);

        return {
            app,
        };
    };

    afterEach(cleanup);
    it('renders without crashing', () => {
        setupTests();
    });

    it('should render the given message', () => {
        const { app } = setupTests();
        app.getByText('welcome to jcleigh');
    });
});


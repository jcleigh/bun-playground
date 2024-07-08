import React from "react";
import { cleanup, render } from "@testing-library/react";
import { describe, it, expect, afterEach } from "bun:test";
import App from "../src/App";

describe("App", () => {
    const setupTests = () => {
        const utils = render(<App />);
        const header = utils.getByTestId("header");
        const synthesizer = utils.getByTestId("synthesizer");
        
        return {
            header,
            synthesizer,
            ...utils,
        };
    };

    afterEach(cleanup);
    
    it("renders without crashing", () => {
        setupTests();
    });

    it("renders the Header component", () => {
        const { header } = setupTests();
        expect(header).not.toBeNull();
    });

    it("renders the Synthesizer component", () => {
        const { synthesizer } = setupTests();
        expect(synthesizer).not.toBeNull();
    });
});
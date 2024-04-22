import React from "react";
import { cleanup, render } from "@testing-library/react";
import { describe, it, expect, afterEach } from "bun:test";
import App from "../src/App";

describe("App", () => {
    const setupTests = () => {
        const utils = render(<App />);
        const header = utils.getByTestId("header");
        const content = utils.getByTestId("contentDiv");
        
        return {
            header,
            content,
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

    it("renders the Content component", () => {
        const { content } = setupTests();
        expect(content).not.toBeNull();
    });
});
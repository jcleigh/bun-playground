import React from "react";
import { cleanup, render } from "@testing-library/react";
import { describe, it, afterEach } from "bun:test";
import Content from "../src/Content";

describe("Content", () => {
    const setupTests = () => {
        const utils = render(<Content />);
        const contentDiv = utils.getByTestId("contentDiv");
        return {
            contentDiv,
            ...utils,
        };
    };

    afterEach(cleanup);

    it("renders without crashing", () => {
        setupTests();
    });

    it("should render the given message", () => {
        const content = setupTests();
        content.getByText("welcome to jcleigh");
    });
});
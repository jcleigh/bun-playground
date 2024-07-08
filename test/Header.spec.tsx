import React from "react";
import { cleanup, render } from "@testing-library/react";
import { describe, it, expect, afterEach } from "bun:test";
import Header from "../src/Header";

describe("Header", () => {
    const setupTests = () => {
        const utils = render(<Header />);
        const homeLink = utils.getByTestId("homeLink");
        const githubLink = utils.getByTestId("githubLink");
        const radiationIcon = utils.getByTestId("radiationIcon");
        const toggleIcon = utils.getByTestId("themeToggleIcon");

        return {
            homeLink,
            githubLink,
            radiationIcon,
            toggleIcon,
            ...utils,
        };
    };

    afterEach(cleanup);

    it("renders without crashing", () => {
        setupTests();
    });

    it("renders the radiation icon", () => {
        const { radiationIcon } = setupTests();
        expect(radiationIcon).not.toBeNull();
    });

    it("displays the jcleigh link", () => {
        const { homeLink } = setupTests();
        expect(homeLink).not.toBeNull();
    });

    it("displays the GitHub icon", () => {
        const { githubLink } = setupTests();
        expect(githubLink).not.toBeNull();
    });

    it("renders the atom icon", () => {
        const { toggleIcon } = setupTests();
        expect(toggleIcon).not.toBeNull();
    });

    it("jcleigh link has correct href", () => {
        const { homeLink } = setupTests();
        expect(homeLink.getAttribute("href")).toBe("/");
    });

    it("GitHub link has correct href", () => {
        const { githubLink } = setupTests();
        expect(githubLink.getAttribute("href")).toBe("https://github.com/jcleigh");
    });

    //TODO: Add tests for theme changes
});
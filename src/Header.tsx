import { FC, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faAtom, faVectorSquare, faCircleRadiation, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const Header: FC = () => {
    const [theme, setTheme] = useState("fallout");

    useEffect(() => {
        switch (theme) {
            case "fallout":
                document.documentElement.style.setProperty("--background-color", "var(--fallout-background-color)");
                document.documentElement.style.setProperty("--text-color", "var(--fallout-text-color)");
                document.documentElement.style.setProperty("--hover-color", "var(--fallout-hover-color)");
                break;
            case "pip-boy":
                document.documentElement.style.setProperty("--background-color", "var(--pip-boy-background-color)");
                document.documentElement.style.setProperty("--text-color", "var(--pip-boy-text-color)");
                document.documentElement.style.setProperty("--hover-color", "var(--pip-boy-hover-color)");
                break;
            case "dark":
                document.documentElement.style.setProperty("--background-color", "var(--dark-background-color)");
                document.documentElement.style.setProperty("--text-color", "var(--dark-text-color)");
                document.documentElement.style.setProperty("--hover-color", "var(--dark-hover-color)");
                break;
            case "light":
                document.documentElement.style.setProperty("--background-color", "var(--light-background-color)");
                document.documentElement.style.setProperty("--text-color", "var(--light-text-color)");
                document.documentElement.style.setProperty("--hover-color", "var(--light-hover-color)");
                break;
            default:
                break;
        }
    }, [theme]);

    const nextTheme = (themes: string[]) => {
        const index = themes.indexOf(theme);
        setTheme(themes[(index + 1) % themes.length]);
    };

    return (
        <header className="header" data-testid="header">
            <div className="left">
                <FontAwesomeIcon icon={faCircleRadiation} className="icon" data-testid="radiationIcon" />
                <a href="/" className="link" data-testid="homeLink">jcleigh</a>
            </div>
            <div className="right">
                <FontAwesomeIcon icon={theme === "pip-boy" ? faVectorSquare : faAtom } onClick={() => nextTheme(["fallout", "pip-boy"])}  className="icon clickable-icon" data-testid="atomIcon" title="Change theme: Vault-Tec & Pip-Boy" />
                <FontAwesomeIcon icon={theme === "light" ? faSun : faMoon} onClick={() => nextTheme(["dark", "light"])}  className="icon clickable-icon" data-testid="moonSunIcon" title="Change theme: Dark & Light" />
                <a href="https://github.com/jcleigh" target="_blank" rel="noopener noreferrer" data-testid="githubLink" title="GitHub">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
        </header>
    );
};

export default Header;
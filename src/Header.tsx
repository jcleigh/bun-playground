import { FC, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faAtom, faCircle, faVectorSquare, faCircleRadiation, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const Header: FC = () => {
    const [theme, setTheme] = useState("fallout");

    useEffect(() => {
        switch (theme) {
            case "fallout":
                document.documentElement.style.setProperty("--background-color", "var(--fallout-background-color)");
                document.documentElement.style.setProperty("--text-color", "var(--fallout-text-color)");
                document.documentElement.style.setProperty("--hover-color", "var(--fallout-hover-color)");
                document.documentElement.style.setProperty("--active-button", "var(--fallout-active-button)");
                document.documentElement.style.setProperty("--inactive-button", "var(--fallout-inactive-button)");
                document.documentElement.style.setProperty("--cancel-button", "var(--fallout-cancel-button)");
                break;
            case "pip-boy":
                document.documentElement.style.setProperty("--background-color", "var(--pip-boy-background-color)");
                document.documentElement.style.setProperty("--text-color", "var(--pip-boy-text-color)");
                document.documentElement.style.setProperty("--hover-color", "var(--pip-boy-hover-color)");                
                document.documentElement.style.setProperty("--active-button", "var(--pip-boy-active-button)");
                document.documentElement.style.setProperty("--inactive-button", "var(--pip-boy-inactive-button)");
                document.documentElement.style.setProperty("--cancel-button", "var(--pip-boy-cancel-button)");
                break;
            case "dark":
                document.documentElement.style.setProperty("--background-color", "var(--dark-background-color)");
                document.documentElement.style.setProperty("--text-color", "var(--dark-text-color)");
                document.documentElement.style.setProperty("--hover-color", "var(--dark-hover-color)");
                document.documentElement.style.setProperty("--active-button", "var(--dark-active-button)");
                document.documentElement.style.setProperty("--inactive-button", "var(--dark-inactive-button)");
                document.documentElement.style.setProperty("--cancel-button", "var(--dark-cancel-button)");
                break;
            case "light":
                document.documentElement.style.setProperty("--background-color", "var(--light-background-color)");
                document.documentElement.style.setProperty("--text-color", "var(--light-text-color)");
                document.documentElement.style.setProperty("--hover-color", "var(--light-hover-color)");
                document.documentElement.style.setProperty("--active-button", "var(--light-active-button)");
                document.documentElement.style.setProperty("--inactive-button", "var(--light-inactive-button)");
                document.documentElement.style.setProperty("--cancel-button", "var(--light-cancel-button)");
                break;
            default:
                break;
        }
    }, [theme]);

    const nextTheme = () => {
        const themes = ["fallout", "pip-boy", "dark", "light"]; // Combined themes array
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
            <FontAwesomeIcon 
                icon={(() => {
                    switch (theme) {
                        case "fallout": return faAtom;
                        case "pip-boy": return faVectorSquare;
                        case "dark": return faMoon;
                        case "light": return faSun;
                        default: return faCircle; // Fallback icon
                    }
                })()} 
                onClick={nextTheme} // Updated onClick to use the new nextTheme function
                className="icon clickable-icon" 
                data-testid="themeToggleIcon" 
                title="Change theme" 
            />
            <a href="https://github.com/jcleigh" target="_blank" rel="noopener noreferrer" data-testid="githubLink" title="GitHub">
                <FontAwesomeIcon icon={faGithub} />
            </a>
            </div>
        </header>
    );
};

export default Header;
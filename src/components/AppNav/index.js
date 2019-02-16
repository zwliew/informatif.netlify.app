import React from "react";
import {
  FaStackOverflow,
  FaHackerNews,
  FaNewspaper,
  FaReddit,
  FaGithub
} from "react-icons/fa";
import AppNavLink from "../AppNavLink";
import { appNav } from "./AppNav.module.css";

export default function AppNav() {
  return (
    <nav className={appNav}>
      <AppNavLink to="/hn" title="Hacker News">
        <FaHackerNews />
      </AppNavLink>
      <AppNavLink to="/gh" title="GitHub">
        <FaGithub />
      </AppNavLink>
      <AppNavLink to="/so" title="Stack Overflow">
        <FaStackOverflow />
      </AppNavLink>
      <AppNavLink to="/reddit" title="Reddit">
        <FaReddit />
      </AppNavLink>
      <AppNavLink to="/global" title="Global News">
        <FaNewspaper />
      </AppNavLink>
    </nav>
  );
}

import React from "react";
import useDarkMode from "use-dark-mode";
import Container from "./presentation/Container";
import Title from "./presentation/Title";
import { useLeftHandedMode, useDisplayedFeed } from "../hooks/prefs";
import {
  DEFAULT_NIGHT_MODE,
  DEFAULT_LEFT_HANDED_MODE,
  FEED_ID_TO_TITLE,
  DEFAULT_DISPLAYED_FEED
} from "../constants/prefs";

function TogglePref({
  id,
  title,
  description,
  handleChange,
  checked
}: {
  id: string;
  title: string;
  description: string;
  handleChange: () => void;
  checked: boolean;
}) {
  return (
    <Container padding={{ top: "8px", bottom: "8px" }}>
      <label htmlFor={id}>
        <Title>{title}</Title>
        <input
          type="checkbox"
          role="switch"
          id={id}
          onChange={handleChange}
          checked={checked}
        />
        <p>{description}</p>
      </label>
    </Container>
  );
}

function ListPref({
  title,
  items
}: {
  id: string;
  title: string;
  items: {
    id: string;
    label: string;
    checked: boolean;
    handleChange: () => void;
  }[];
}) {
  return (
    <Container padding={{ top: "8px", bottom: "8px" }}>
      <Title>{title}</Title>
      {items.map(({ id, label, checked, handleChange }) => (
        <Container padding={{ top: "2px", bottom: "2px" }} key={id}>
          <label htmlFor={id}>{label}</label>
          <input
            type="checkbox"
            role="switch"
            id={id}
            onChange={handleChange}
            checked={checked}
          />
        </Container>
      ))}
    </Container>
  );
}

function NightModePref() {
  const { value, toggle } = useDarkMode(DEFAULT_NIGHT_MODE);
  return (
    <TogglePref
      id="night-mode"
      title="Night mode"
      description="Optimize color scheme for viewing in the dark"
      handleChange={toggle}
      checked={value}
    />
  );
}

function LeftHandedModePref() {
  const [enabled, setEnabled] = useLeftHandedMode(DEFAULT_LEFT_HANDED_MODE);
  return (
    <TogglePref
      id="left-handed-mode"
      title="Left-handed mode"
      description="Improve accessibility for left-handed use"
      handleChange={() => setEnabled(prevEnabled => !prevEnabled)}
      checked={enabled}
    />
  );
}

function DisplayedFeedsPref() {
  const feeds = Object.keys(FEED_ID_TO_TITLE).map((feedId: string) => {
    const [displayed, setDisplayed] = useDisplayedFeed(feedId)(
      DEFAULT_DISPLAYED_FEED
    );
    return {
      id: feedId,
      label: FEED_ID_TO_TITLE[feedId],
      checked: displayed,
      handleChange: () =>
        setDisplayed((prevDisplayed: boolean) => !prevDisplayed)
    };
  });
  return (
    <ListPref id="displayed-feeds" title="Displayed feeds" items={feeds} />
  );
}

export default function Preferences() {
  return (
    <Container padding={{ left: "8px" }}>
      <Title>Preferences</Title>
      <NightModePref />
      <LeftHandedModePref />
      <DisplayedFeedsPref />
    </Container>
  );
}

import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";

import { Place } from "Components/Address/GoogleAutocomplete/PlacePredictions/Place";

import classes from "./placePredictions.module.css";

type PlacesType = {
  placeId: string;
  mainText: string;
  secondaryText: string;
};

interface Props {
  placePredictions: Array<PlacesType>;
  showDropDown: boolean;
  onSelectItem: (e: any) => void;
}

const PlacePredictions = ({ placePredictions, showDropDown, onSelectItem }: Props) => (
  <ul className={`dropdown-menu ${classes.placeListBase} ${showDropDown ? "show" : ""}`}>
    {placePredictions.map((place) => (
      <Place key={place.placeId} place={place} onSelectItem={onSelectItem} />
    ))}
  </ul>
);

const PlacePredictionsMemo = memo(PlacePredictions, areEqual);

export { PlacePredictionsMemo as PlacePredictions };

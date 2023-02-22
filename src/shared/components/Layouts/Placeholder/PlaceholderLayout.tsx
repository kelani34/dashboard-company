import React, { memo } from "react";

import { RocketEmblemSvg } from "Components/Icons/RocketEmblem";
import { areEqual } from "Utils/equalityChecks";

interface Props {
  svgItem?: number;
}

const PlaceholderLayout = ({ svgItem }: Props) => (
  <div className="d-flex justify-content-center align-items-center">
    <RocketEmblemSvg svgItem={svgItem} />
  </div>
);

PlaceholderLayout.defaultProps = {
  svgItem: 1,
};

const PlaceholderLayoutMemo = memo(PlaceholderLayout, areEqual);

export { PlaceholderLayoutMemo as PlaceholderLayout };

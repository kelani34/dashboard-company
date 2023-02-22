import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";

import { Icon } from "Components/Icons";
import { Button } from "Components/Button/Button";

// Custom css
import { useSelector } from "react-redux";
import { ErrorMessages } from "Components/ErrorMessages";
import classes from "./socialMedia.module.css";

interface Props {
  onClick: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const SocialMedia = ({ onClick, onKeyUp }: Props) => {
  const keyUp = onKeyUp;
  const errors = useSelector(
    ({
      auth: {
        socialLoginErrors: { errors },
      },
    }: any) => errors,
    areEqual
  );

  const message = useSelector(
    ({
      auth: {
        socialLoginErrors: { message },
      },
    }: any) => message,
    areEqual
  );

  return (
    <div className={`container ${classes.socialMediaWrapper}`}>
      <div className="d-flex flex-row justify-content-between">
        <Button
          className={`textAlignCenter ${classes.socialMediaButton}`}
          id="btnFacebook"
          onClick={onClick}
          onKeyUp={keyUp}
        >
          <Icon type="facebook" />
        </Button>
        <Button
          className={`textAlignCenter ${classes.socialMediaButton}`}
          id="btnGoogle"
          onClick={onClick}
          onKeyUp={keyUp}
        >
          <Icon type="google" />
        </Button>
        <Button
          className={`textAlignCenter ${classes.socialMediaButton}`}
          id="btnApple"
          onClick={onClick}
          onKeyUp={keyUp}
        >
          <Icon type="apple" />
        </Button>
      </div>
      {errors && <ErrorMessages message={message} />}
    </div>
  );
};

SocialMedia.defaultProps = {
  onKeyUp: undefined,
};
const SocialMediaMemo = memo(SocialMedia, areEqual);
export { SocialMediaMemo as SocialMedia };

import React, { memo } from 'react';

import { Button } from 'Components/Button';
import { Icon } from 'Components/Icons';
import { areEqual } from 'Utils/equalityChecks';
import { Label } from 'Components/Label';

import classes from './countryCodeSelector.module.css';

type CountryCodeType = {
  id: number;
  name: string;
  code: number;
  flag: string;
};

interface Props {
  countries: Array<CountryCodeType>;
  selectedCountryCode: any;
  selectedCountryFlag: string;
  selectedCountryId: number;
  isOpen?: boolean;
  readOnly?: boolean;
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
}

const CountryCodeSelector = ({
  countries,
  selectedCountryCode,
  selectedCountryFlag,
  selectedCountryId,
  isOpen,
  readOnly,
  onChange,
  onClick,
}: Props) => (
  <div className={`accordion ${classes.countryCodesWrapper}`} id="valid-country-codes">
    <div className={`accordion-item ${classes.itemHeading}`}>
      <Label ariaLabel="Country" className={classes.label}>
        Country
      </Label>
      <h2 className={`accordion-header ${classes.selectionHeading} `} id="country-codes">
        <div
          className={`accordion-button collapsed ${classes.currentCountry} ${
            isOpen ? classes.openMenu : classes.closed
          } ${readOnly ? classes.readOnly : ''}
          `}
          role="button"
          data-bs-target="#country-options"
          aria-expanded="false"
          aria-controls="country-options"
          onClick={onClick}
          onKeyDown={onClick}
          tabIndex={0}
        >
          <Icon type={selectedCountryFlag} />
          <input type="text" value={`(+${selectedCountryCode})`} onChange={onClick} readOnly />
        </div>
      </h2>

      <div
        id="country-options"
        className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
        aria-labelledby="country-options"
        data-bs-parent="countryCodes"
      >
        <div
          className={`accordion-body ${classes.menuBody} ${isOpen ? 'show' : ''} ${
            readOnly ? classes.wrapperReadOnly : ''
          }`}
        >
          {countries.length > 0 &&
            countries.map(({ id, name, code, flag }: any) => (
              <Button
                className={`${classes.countryOption} ${id === selectedCountryId ? classes.currentSelection : ''}`}
                id={id}
                key={name}
                type="button"
                onClick={onChange}
              >
                <span className={classes.iconNameArea}>
                  <Icon type={flag} />
                  {name}
                </span>
                {code}
              </Button>
            ))}
        </div>
      </div>
    </div>
  </div>
);

CountryCodeSelector.defaultProps = {
  isOpen: undefined,
  readOnly: false,
  onChange: undefined,
  onClick: undefined,
};

const CountryCodeSelectorMemo = memo(CountryCodeSelector, areEqual);
export { CountryCodeSelectorMemo as CountryCodeSelector };

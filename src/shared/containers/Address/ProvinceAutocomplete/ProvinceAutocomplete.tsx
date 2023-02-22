import React, { memo, useCallback, useEffect, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { ProvinceAutocomplete } from 'Components/Address';
import { useSelector } from 'react-redux';

interface Props {
  state: string;
  setSelectedProvince: (e: any) => void;
  invalid?: boolean;
  showCaretIcon?: boolean;
}

const provincesSelector = ({ address: { provinces } }: any) => provinces;

const ProvinceAutocompleteContainer = ({ state, setSelectedProvince, invalid, showCaretIcon }: Props) => {
  const [province, setProvince] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);

  // API data
  const provincesList = useSelector(provincesSelector, areEqual);

  // set province value if passed from the parent (redux variable)
  useEffect(() => {
    setProvince(state);
  }, [state]);

  useEffect(() => {
    if (provincesList.length > 0) {
      setProvinces(provincesList);
    }
  }, [provincesList]);

  const onChangeProvince = useCallback(
    (e: any) => {
      e.preventDefault();

      const { value } = e.target;
      const lowercase = value.toLocaleLowerCase();
      setProvinces(
        value.length > 0
          ? provincesList.filter((province: any) => province.name.toLocaleLowerCase().includes(lowercase))
          : []
      );
      setProvince(value);
      setSelectedProvince(value);
      setShowDropDown(value.length > 0);
    },
    [provincesList]
  );

  const onSelectItem = useCallback((e: any) => {
    e.preventDefault();

    const { name = '' } = e.target.dataset;

    setProvince(name);
    setSelectedProvince(name);

    setShowDropDown(false);
  }, []);

  // useEffect(() => {
  //   setShowDropDown(province.length > 0 && provinces.length > 0);
  // }, [provinces]);

  const onClickCaretIcon = useCallback(() => {
    setShowDropDown((prevState) => !prevState);
  }, []);

  // const onBlur = useCallback((e: any) => {
  //   e.preventDefault();
  //   setShowDropDown(false);
  // }, []);

  return (
    <ProvinceAutocomplete
      province={province}
      onChangeProvince={onChangeProvince}
      provinces={provinces}
      onSelectItem={onSelectItem}
      showDropDown={showDropDown}
      invalid={invalid}
      showCaretIcon={showCaretIcon}
      onClickCaretIcon={onClickCaretIcon}
    />
  );
};

ProvinceAutocompleteContainer.defaultProps = {
  invalid: false,
  showCaretIcon: false,
};

const ProvinceAutocompleteContainerMemo = memo(ProvinceAutocompleteContainer, areEqual);

export { ProvinceAutocompleteContainerMemo as ProvinceAutocompleteContainer };

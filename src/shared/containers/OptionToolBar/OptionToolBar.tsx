import React, { memo, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { OptionToolBar } from 'Components/OptionToolBar';

// To populate option titles, set array in Utils/data and import
// Can hold 2 - 4 options before style over rides would be required
// OptionTypes in component is set to take id:number and value:string
interface Props {
  idForLabel?: string;
  label?: string;
  classificationId?: number;
  optionNames: any[];
  setClassificationId: (e: any) => void;
}

const OptionToolBarContainer = ({ idForLabel, label, classificationId, optionNames, setClassificationId }: Props) => {
  const onClickSelection = useCallback(
    (e: any) => {
      e.preventDefault();

      const { id } = e.target;
      setClassificationId((prevId) => (prevId === +id ? '' : +id));
    },
    [classificationId]
  );

  return (
    <OptionToolBar
      idForLabel={idForLabel}
      label={label}
      optionNames={optionNames}
      selectedOption={classificationId}
      onClick={onClickSelection}
    />
  );
};
OptionToolBarContainer.defaultProps = {
  idForLabel: undefined,
  label: undefined,
  classificationId: undefined,
};
const OptionToolBarContainerMemo = memo(OptionToolBarContainer, areEqual);

export { OptionToolBarContainerMemo as OptionToolBar };

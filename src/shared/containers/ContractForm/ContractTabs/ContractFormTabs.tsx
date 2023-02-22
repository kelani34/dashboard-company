import React, { memo, useState, useEffect } from 'react';
import { Label } from 'Components/Label';
import { TextArea } from 'Components/TextArea';
import { areEqual } from 'Utils/equalityChecks';
import { CheckBox } from 'Components/CheckBox';
import { TextBox } from 'Components/TextBox';
import { ContractFormsTabMenu } from 'Components/Tabs/FormTabMenu';
import { PurpleButton } from 'Components/Button';
import { MyContractForm } from '../MyContractForm';
import { CreateContractForm } from '../CreateContractForm';
import { DeleteContractModal } from '../DeleteContractModal';
import { Api } from '../../../utils/api';

import classes from './contractFormTabs.module.css';
// interface Props {
//   onClickRow?: (e: any) => void;
// }

const defaultFormType = {
  company_id: '28',
  name: '',
  replacement_tags: '',
  status: 'active',
  template: '',
  has_signature: false,
};
const ContractFormTabsContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [formData, setFormdata] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [check, setCheck] = useState(false);
  const [deleteID, setdeleteID] = useState();
  const [created, setCreated] = useState(false);
  const [data, setData] = useState(defaultFormType);

  const fetch = async () => {
    setFetching(true);
    const response = await Api.get('/companies/28/contract-forms');
    setFormdata(response?.data?.data);
    setFetching(false);
  };

  useEffect(() => {
    fetch();
  }, [created]);

  const deleteForm = async () => {
    setDelete(!isDelete);
    await Api.delete(`/contract-forms/${deleteID}`);
    setDelete(!isDelete);
    setCreated(!created);
  };

  const updateForm = (value: string | boolean, key: string) => {
    if (key === 'has_signature') {
      setCheck(!check);
      data[key] = !check;
    } else {
      data[key] = value;
    }

    setData(data);
  };

  const onChange = (e: any) => {
    updateForm(e.target.value, e.target.name);
  };

  const onSumit = async () => {
    await Api.post('/contract-forms', data);
    setIsOpen(!isOpen);
    setCreated(!created);
  };

  const modalCloseClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ContractFormsTabMenu id="contract-tabs" modalCloseClick={modalCloseClick}>
        <MyContractForm
          forms={{
            meta: { total: 60 },
            data: formData,
          }}
          onDeleteClick={(id: any) => {
            setdeleteID(id);
            setDelete(!isDelete);
          }}
          fetching={fetching}
        />
      </ContractFormsTabMenu>
      {isOpen && (
        <CreateContractForm isOpen={isOpen} modalCloseClick={modalCloseClick}>
          <div>
            <Label ariaLabel="label">
              <span>Form Name:</span>
            </Label>
            <TextBox name="name" type="text" ariaLabel="name" onChange={onChange} className={classes.textBox} />

            <div className={classes.checkboxContainer}>
              Required Signature
              <CheckBox checked={check} className="" onChange={onChange} name="has_signature" />
            </div>
            <Label ariaLabel="label">
              <span>Contract Template</span>
            </Label>
            <div className={classes.textBoxContainer}>
              <TextArea name="replacement_tags" ariaLabel="area" onChange={onChange} minRows={10} resizable />
              <TextArea name="template" ariaLabel="area" onChange={onChange} minRows={14} resizable />
            </div>
            <div className={classes.flexCenter}>
              <PurpleButton onClick={onSumit} className={classes.btn}>
                <span>Add Contract</span>
              </PurpleButton>
            </div>
          </div>
        </CreateContractForm>
      )}
      {isDelete && (
        <DeleteContractModal
          isOpen={isDelete}
          onCloseClick={() => {
            setDelete(!isDelete);
          }}
          onDeleteClick={deleteForm}
        />
      )}
    </>
  );
};

ContractFormTabsContainer.defaultProps = {};

const ContractFormTabsContainerMemo = memo(ContractFormTabsContainer, areEqual);

export { ContractFormTabsContainerMemo as ContractFormTabs };

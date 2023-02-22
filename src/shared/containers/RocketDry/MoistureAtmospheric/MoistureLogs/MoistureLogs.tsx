import React, { memo, useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { MoistureLogsTable } from 'Components/RocketDry';
import { SpinnerBlock } from 'Components/SpinnerBlock';

import { MoistureLogsTableContainer } from 'Containers/RocketDry';

import { getMaterialWithDryingLogs } from 'Containers/RocketDry/actions';

import { damagedMaterialsSelector, projectHasNewDamageTypesSelector } from 'Containers/RocketScan/selectors';

import { legacyWhitelists, dryingWhitelists } from 'Utils/rocketDryMaterialWhitelist';

import { moistureLogTableHeaders } from 'Utils/table';

interface Props {
  roomId: any;
}

const applyWhitelist = (material: any, isLegacy: boolean) => {
  const { materialType, materialName, isCustom } = material;

  if (isCustom) {
    return true;
  }
  if (isLegacy) {
    switch (materialType) {
      case 'Flooring':
        return legacyWhitelists.flooring.some((material) => material === materialName);
      case 'Walls':
        return legacyWhitelists.walls.some((material) => material === materialName);
      case 'Ceiling':
        return legacyWhitelists.ceiling.some((material) => material === materialName);
      case 'Plumbing':
        return legacyWhitelists.plumbing.some((material) => material === materialName);
      case 'Structural':
        return legacyWhitelists.structural.some((material) => material === materialName);
      default:
        return false;
    }
  } else {
    switch (materialType) {
      case 'Carpentry':
        return dryingWhitelists.carpentry.some((material) => material === materialName);
      case 'Ceiling':
        return dryingWhitelists.ceiling.some((material) => material === materialName);
      case 'Flooring':
        return dryingWhitelists.flooring.some((material) => material === materialName);
      case 'Plumbing':
        return dryingWhitelists.plumbing.some((material) => material === materialName);
      case 'Walls':
        return dryingWhitelists.walls.some((material) => material === materialName);
      default:
        return false;
    }
  }
};

const MoistureLogsContainer = ({ roomId }: Props) => {
  const dispatch = useDispatch();

  const mounted = useRef(true);

  const [roomMaterialList, setRoomMaterialList] = useState([]);
  const [fetching, setFetching] = useState(false);

  const allMaterialList = useSelector(damagedMaterialsSelector, areEqual);
  const useNewDamageTypes = useSelector(projectHasNewDamageTypesSelector, areEqual);

  const getRoomMaterialList = useCallback(
    async (materialList: any) => {
      setFetching(true);

      const response: any = await dispatch(getMaterialWithDryingLogs(roomId));

      if (mounted) {
        if (response?.data) {
          const { data } = response;

          let damageMaterialList = [];
          damageMaterialList = Object.entries(data)
            .map(([materialId, logs]) => {
              const material = materialList.find((material: any) => material.id.toString() === materialId);
              return {
                materialId,
                materialName: material?.name,
                materialType: material?.damage_type?.name,
                isCustom: !material?.is_standard,
                logs,
              };
            })
            .filter((material) => applyWhitelist(material, useNewDamageTypes));

          setRoomMaterialList(damageMaterialList);
        } else {
          setRoomMaterialList([]);
        }

        setFetching(false);
      }
    },
    [roomId, useNewDamageTypes]
  );

  // initial fetch
  useEffect(() => {
    mounted.current = true;
    if (allMaterialList.length > 0) {
      (async function fetchData() {
        await getRoomMaterialList(allMaterialList);
      })();
    }

    return () => {
      if (mounted) {
        mounted.current = false;
      }
    };
  }, [allMaterialList]);

  return (
    <>
      <SpinnerBlock fetching={fetching} />
      {!fetching && roomMaterialList.length > 0 ? (
        roomMaterialList.map((material) => (
          <MoistureLogsTableContainer key={material.materialId} materialWithLogs={material} />
        ))
      ) : (
        <MoistureLogsTable headers={moistureLogTableHeaders} logs={[]} />
      )}
    </>
  );
};

const MoistureLogsContainerMemo = memo(MoistureLogsContainer, areEqual);

export { MoistureLogsContainerMemo as MoistureLogs };

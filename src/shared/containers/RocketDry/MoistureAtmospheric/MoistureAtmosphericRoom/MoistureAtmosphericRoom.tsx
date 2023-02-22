import React, { memo, useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { InternalAtmosphericTable, RocketDryRoomHeader, NoRecordingsPlaceholder } from 'Components/RocketDry';
import { MoistureLogs } from 'Containers/RocketDry';
import { SpinnerBlock } from 'Components/SpinnerBlock';

import { getRoomAtmosphericLogs } from 'Containers/RocketDry/actions';

import { internalAtmosphericTableHeaders } from 'Utils/table';

import classes from './moistureAtmosphericRoom.module.css';

interface Props {
  room: any;
}

interface LogGroup {
  areaName: string;
  noAlias: boolean;
  logs: any[];
}

const MoistureAtmosphericRoomContainer = ({ room }: Props) => {
  const dispatch = useDispatch();

  const mounted = useRef(true);

  const [logs, setLogs] = useState([]);
  const [fetching, setFetching] = useState(false);

  // room data
  const {
    id: roomId,
    room_type: { name: roomType },
  } = room;

  const getInternalAtmosphericLogs = useCallback(async () => {
    setFetching(true);

    const response: any = await dispatch(getRoomAtmosphericLogs(roomId));

    if (mounted) {
      if (response?.data) {
        const { data: moistureLogs } = response;
        let groupedLogs: LogGroup[] = [];
        if (moistureLogs.length > 0) {
          groupedLogs = Object.values(
            moistureLogs.reduce((logsInfoTemp: LogGroup[], logEntry) => {
              // get room area
              const roomArea: string = logEntry.room_area ?? 'null';

              // set the room area array if it doesn't exist yet
              if (!logsInfoTemp[roomArea]) {
                // create temp alias if needed
                if (roomArea.includes('RocketPlan-DefaultRoomArea')) {
                  const logsTempValues: LogGroup[] = Object.values(logsInfoTemp);
                  const noAliasCount = (logsTempValues.filter((logGroup) => logGroup.noAlias).length ?? 0) + 1;

                  logsInfoTemp[roomArea] = {
                    areaName: `#${noAliasCount.toString()}`,
                    noAlias: true,
                    logs: [],
                  };
                } else {
                  logsInfoTemp[roomArea] = {
                    areaName: roomArea,
                    noAlias: false,
                    logs: [],
                  };
                }
              }

              // assign each log to its respective group
              logsInfoTemp[roomArea].logs.push(logEntry);

              return logsInfoTemp;
            }, [])
          );
        }

        setLogs(groupedLogs);
      } else {
        setLogs([]);
      }

      setFetching(false);
    }
  }, [roomId]);

  // initial fetch
  useEffect(() => {
    mounted.current = true;
    (async function fetchData() {
      await getInternalAtmosphericLogs();
    })();

    return () => {
      if (mounted) {
        mounted.current = false;
      }
    };
  }, []);

  return (
    <div>
      <RocketDryRoomHeader icon={roomType} title={roomType} />

      <h3 className={classes.sectionHeader}>Internal Atmospheric</h3>
      <SpinnerBlock fetching={fetching} />
      {!fetching && logs?.length > 0 ? (
        logs.map((roomArea: any) => (
          <InternalAtmosphericTable
            key={roomArea.areaName}
            roomAreaName={roomArea.areaName}
            headers={internalAtmosphericTableHeaders}
            logs={roomArea.logs}
          />
        ))
      ) : (
        <NoRecordingsPlaceholder />
      )}
      <h3 className={classes.sectionHeader}>Moisture Logs</h3>
      <MoistureLogs roomId={roomId} />
    </div>
  );
};

const MoistureAtmosphericRoomContainerMemo = memo(MoistureAtmosphericRoomContainer, areEqual);

export { MoistureAtmosphericRoomContainerMemo as MoistureAtmosphericRoom };

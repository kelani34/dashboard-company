import React, { memo, useCallback, useEffect, useState } from "react";
import { areEqual } from "Utils/equalityChecks";

import classes from "Containers/SingleUnitAdd/singleUnitAdd.module.css";

import { UnitHeader } from "Components/Project/Unit";
import { UnitContent } from "Containers/Project/Unit/UnitContent";
import { PhotoFilter } from "Containers/PhotoFilter";
import { useDispatch, useSelector } from "react-redux";
import { singleUnitSelector } from "Containers/Project/Unit/selector";
import { roomsSelector, singleUnitFetchingRoomsSelector } from "Containers/Project/Unit/Rooms/selectors";

import { Spinner } from "Components/Spinner";
import { LocationsPlaceholder } from "Containers/LocationsPlaceholder";
import { ADD_LOCATIONS, PHOTO_MANAGEMENT } from "Utils/constants";
import { useHistory, useLocation } from "react-router-dom";
import { setSelectedRoomId } from "Containers/Project/Unit/Rooms/actions";

const SingleUnitContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { pathname } = location;

  const unit: any = useSelector(singleUnitSelector, areEqual);
  const rooms = useSelector(roomsSelector, areEqual);
  const fetching = useSelector(singleUnitFetchingRoomsSelector, areEqual);

  useEffect(() => {
    dispatch(setSelectedRoomId(null));
  }, [pathname]);

  const onAddButtonClick = useCallback(() => {
    history.push(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}`);
  }, []);

  const [view, setView] = useState(null);

  const views = {
    singleUnit: (
      <div className={`d-flex flex-column justify-content-flex-start w-100 ${classes.containerWrapper}`}>
        <div className="d-flex w-100 justify-content-center">
          <PhotoFilter />
        </div>
        <UnitHeader unitName={unit.name} unitType="singleHome" />
        <UnitContent />
      </div>
    ),
    noLocations: (
      <LocationsPlaceholder
        heading="No locations yet. Add a new location, or start adding photos."
        onTabClick={onAddButtonClick}
      />
    ),
  };

  useEffect(() => {
    if (rooms.length > 0 && !fetching) {
      setView(views.singleUnit);
    } else if (!fetching) {
      setView(views.noLocations);
    }
  }, [rooms, fetching]);

  return (
    <div className={classes.singleUnitWrapper}>
      {fetching && <Spinner loading={fetching} />}
      {view}
    </div>
  );
};

const SingleUnitContainerMemo = memo(SingleUnitContainer, areEqual);

export { SingleUnitContainerMemo as SingleUnitContainer };

import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import GoogleMapReact from 'google-map-react';
import { CompanyProjectsDataModal } from 'Containers/Projects/Modals';
import { MapPin } from 'Containers/MapPin';

import { parseNumber } from 'Utils/numbers';
// import { getCoordinatesFromAddress } from 'Utils/google';
import classes from './googleMap.module.css';
import MapStyle from './MapStyle';

interface Props {
  center: {
    lat?: number;
    lng?: number;
  };
  zoom: number;
  myProjects: CompanyProjectsDataModal;
  fetching: any;
  handleChangeProject: any;
  activeProject: any;
}

const GoogleMap = ({ center, zoom, myProjects, fetching, handleChangeProject, activeProject }: Props) => (
  <div className={classes.googleMapBase}>
    <GoogleMapReact
      options={{ styles: MapStyle.mapStyle }}
      bootstrapURLKeys={{ key: process.env.REACT_GOOGLE_API_KEY }}
      center={center}
      zoom={zoom}
    >
      {!fetching && myProjects.data.length
        ? myProjects.data.map((project) => {
            // TODO:: need to find a better plugin to replace this logic in the MapPin container

            const { id, uid, address } = project;
            const { latitude, longitude } = address;

            // const [lat] = useState(parseNumber(latitude));
            // const [lng] = useState(parseNumber(longitude));

            // useEffect(() => {
            //   if (!latitude) {
            //     getCoordinatesFromAddress(address, setLat, setLng);
            //   }
            // }, []);

            // this plugin require following props (lat, lng) in order to show a custom marker on the map
            // so had to generate coordinates here for addresses that are entered manually
            return (
              <MapPin
                key={uid}
                lat={parseNumber(latitude)}
                lng={parseNumber(longitude)}
                onClick={handleChangeProject}
                project={project}
                selected={activeProject?.id === id}
              />
            );
          })
        : null}
    </GoogleMapReact>
  </div>
);

const GoogleMapMemo = memo(GoogleMap, areEqual);

export { GoogleMapMemo as GoogleMap };

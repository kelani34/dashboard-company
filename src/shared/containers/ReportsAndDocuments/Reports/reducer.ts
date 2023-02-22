import {
  SELECTED_REPORT_LOCATIONS,
  reportActionTypes,
  REPORT_CREATED,
  REPORT_CREATING,
  PROJECT_REPORTS,
  REPORT_ERRORS,
  REPORT_DELETED,
  REPORT_SHARED,
  REPORT_SHARING,
} from 'Containers/ReportsAndDocuments/Reports/actions';
import { addOrRemoveFromArray } from 'Utils/helpers';

const initialState = {
  selectedReportLocations: [],
  reportCreating: false,
  reportCreated: false,
  reportDeleted: false,
  reportSharing: false,
  reportShared: false,
  reports: undefined,
  errors: undefined,
};

export const reportsReducer = (state = initialState, action: reportActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case SELECTED_REPORT_LOCATIONS:
      return {
        ...state,
        selectedReportLocations: addOrRemoveFromArray(state.selectedReportLocations, payload),
      };
    case REPORT_CREATING:
      return {
        ...state,
        reportCreating: payload,
      };
    case REPORT_CREATED:
      return {
        ...state,
        reportCreated: payload,
      };
    case REPORT_DELETED:
      return {
        ...state,
        reportDeleted: payload,
      };
    case REPORT_SHARED:
      return {
        ...state,
        reportShared: payload,
      };
    case REPORT_SHARING:
      return {
        ...state,
        reportSharing: payload,
      };
    case PROJECT_REPORTS: {
      if (payload.data) {
        payload.data.map((report) => {
          if (report.settings.includes('rocketdry')) {
            report.type = 'Drying Log';
          } else if (report.settings.includes('compact')) {
            report.type = 'Photo - Compact';
          } else if (report.settings.includes('expanded')) {
            report.type = 'Photo - Expanded';
          } else {
            report.type = 'Photo - Large';
          }
          return report;
        });
      }
      return {
        ...state,
        reports: payload,
      };
    }
    case REPORT_ERRORS:
      return {
        ...state,
        errors: payload,
      };

    default:
      return state;
  }
};

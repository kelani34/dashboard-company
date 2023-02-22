import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { DeleteReportModal, ReportsTable, ShareReportModal } from 'Components/ReportsAndDocuments';
import { UserModel } from 'Containers/User/Models/UserModel';
import { useUser } from 'Context/User';
import { reportTableHeaders } from 'Utils/table';
import { useDispatch, useSelector } from 'react-redux';
import {
  emailErrorSelector,
  reportDeletedSelector,
  reportSharedSelector,
  reportSharingSelector,
  reportsSelector,
} from 'Containers/ReportsAndDocuments/Reports/selectors';
import { projectSelector } from 'Containers/RocketScan/selectors';
import {
  deleteReport,
  listProjectReports,
  setReportDeleted,
  setReportShared,
  shareReport,
} from 'Containers/ReportsAndDocuments/Reports/actions';
import { DownloadReportModal } from 'Components/ReportsAndDocuments/Reports/DownloadReportModal';
import { download } from 'Utils/helpers';
import { pusherSelector } from 'Containers/Core/selectors';

const ReportsTableContainer = () => {
  const dispatch = useDispatch();

  const { isCompanyAdmin }: UserModel = useUser();

  const [headers, setHeaders] = useState([]);
  const [sortBy, setSortBy] = useState('-created_at');
  const [initialPage, setInitialPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const project = useSelector(projectSelector, areEqual);
  const reports = useSelector(reportsSelector, areEqual);
  const reportDeleted = useSelector(reportDeletedSelector, areEqual);
  const reportShared = useSelector(reportSharedSelector, areEqual);
  const reportSharing = useSelector(reportSharingSelector, areEqual);
  const pusher = useSelector(pusherSelector, areEqual);

  /*
   * Reports table functions
   * */
  useEffect(() => {
    setHeaders(reportTableHeaders.filter((header: any) => (isCompanyAdmin ? header : header.column !== 'delete')));
  }, [isCompanyAdmin]);

  const getReports = useCallback(() => {
    const { id: projectId } = project;

    dispatch(listProjectReports(projectId, sortBy, initialPage + 1));
  }, [project, sortBy, initialPage]);

  useEffect(() => {
    if (project?.id) {
      getReports();
    }
  }, [project, sortBy, initialPage]);

  // set meta data
  useEffect(() => {
    if (reports?.data?.length > 0) {
      const { meta } = reports;
      const { total } = meta;

      setPageCount(total <= 5 ? 1 : Number(total / 5));
    }
  }, [reports]);

  const onClickSort = useCallback((sort: string) => {
    setSortBy((prevSortBy) => (prevSortBy.includes('-') ? prevSortBy.replace('-', '') : sort));
  }, []);

  const onPageChange = useCallback(({ selected: page }: any) => {
    setInitialPage(page);
  }, []);

  const onDownloadIconClick = useCallback(
    (report: any) => {
      setSelectedReport(report);
      setShowDownloadModal(true);
    },
    [reports]
  );

  const onShareIconClick = useCallback((report: any) => {
    setSelectedReport(report);
    setShowShareModal(true);
  }, []);

  const onDeleteIconClick = useCallback(
    (report: any) => {
      setSelectedReport(report);
      setShowDeleteModal(true);
    },
    [reports]
  );

  /*
   * Reports download functions
   * */
  const onDownloadButtonClick = useCallback(async () => {
    if (selectedReport) {
      setLoading(true);
      const { name, pdf_url: url } = selectedReport;
      await download(url, name, setLoading);
    }
  }, [selectedReport]);

  /*
   * Reports share functions
   * */
  const errors = {
    email: useSelector(emailErrorSelector, areEqual),
  };

  const onChangeEmail = useCallback(({ target: { value } }: any) => {
    setEmail(value);
  }, []);

  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      const { id } = selectedReport;

      dispatch(shareReport(id, { email }));
    },
    [email, selectedReport]
  );

  useEffect(() => {
    if (reportShared) {
      setShowShareModal(false);
      dispatch(setReportShared(false));
    }

    return () => {
      if (reportShared) {
        dispatch(setReportShared(false));
      }
    };
  }, [reportShared]);

  /*
   * Reports delete functions
   * */
  const onDeleteButtonClick = useCallback(() => {
    if (selectedReport) {
      setLoading(true);
      const { id } = selectedReport;
      dispatch(deleteReport(id));
    }
  }, [selectedReport]);

  // refresh on delete
  useEffect(() => {
    if (reportDeleted) {
      getReports();
      setShowDeleteModal(false);
      setLoading(false);
      dispatch(setReportDeleted(false));
    }

    return () => {
      if (reportDeleted) {
        dispatch(setReportDeleted(false));
      }
    };
  }, [reportDeleted]);

  /*
   * Reports common functions
   * */

  const onCancelButtonClick = useCallback((e: any) => {
    e.preventDefault();
    setTimeout(() => setSelectedReport(undefined), 500);
    setShowDeleteModal(false);
    setShowDownloadModal(false);
    setShowShareModal(false);
  }, []);

  // to refresh reports on completed
  useEffect(() => {
    if (project?.id) {
      const { id: projectId } = project;
      pusher
        ?.subscribe(`BroadcastProjectReportGeneratedEvent.Project.${projectId}`)
        ?.bind('App\\Events\\BroadcastProjectReportGeneratedEvent', getReports);
    }

    return () => {
      if (project?.id) {
        const { id: projectId } = project;
        pusher.unsubscribe(`BroadcastProjectReportGeneratedEvent.Project.${projectId}`);
      }
    };
  }, [pusher, project]);

  return (
    <>
      <ReportsTable
        headers={headers}
        reports={reports}
        sortBy={sortBy}
        initialPage={initialPage}
        pageCount={pageCount}
        isCompanyAdmin={isCompanyAdmin}
        onClickSort={onClickSort}
        onPageChange={onPageChange}
        onDownloadIconClick={onDownloadIconClick}
        onShareIconClick={onShareIconClick}
        onDeleteIconClick={onDeleteIconClick}
      />
      <DownloadReportModal
        loading={loading}
        reportName={selectedReport?.name}
        isOpen={showDownloadModal}
        onDownloadButtonClick={onDownloadButtonClick}
        modalCloseClick={onCancelButtonClick}
      />
      <ShareReportModal
        loading={reportSharing}
        reportName={selectedReport?.name}
        email={email}
        isOpen={showShareModal}
        formErrors={errors}
        modalCloseClick={onCancelButtonClick}
        onChangeEmail={onChangeEmail}
        onFormSubmit={onFormSubmit}
      />
      <DeleteReportModal
        loading={loading}
        reportName={selectedReport?.name}
        showDeleteModal={showDeleteModal}
        onDeleteButtonClick={onDeleteButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        modalCloseClick={onCancelButtonClick}
      />
    </>
  );
};

const ReportsTableContainerMemo = memo(ReportsTableContainer, areEqual);

export { ReportsTableContainerMemo as ReportsTableContainer };

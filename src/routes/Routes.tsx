import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import queryString from 'query-string';

// layout wrappers and dashboard container
import { Dashboard, DashboardWrapper } from 'Containers/Dashboard';
import { GuestWrapper } from 'Containers/Auth';
import { PhotoViewWrapper } from 'Containers/PhotoView/PhotoViewWrapper';
import { SplashPageWrapper } from 'Containers/SplashPageWrapper';

import { PhotoShare, PhotoShareGallery, PhotoShareWrapper } from 'Containers/Public';

import { NotFoundWrapper } from 'Containers/NotFoundWrapper';
// guest components
import {
  SignInHow,
  SignInEmail,
  SignUpEmail,
  ForgotPassword,
  ForgotPasswordEmailSent,
  ResetPassword,
  PhoneVerification,
  PhoneVerificationCode,
  SignUpUserInformation,
  WelcomeAboard,
  NoCompany,
  SelectAccountType,
  Blocked,
} from 'Containers/SignIn';

import { PhotoView } from 'Containers/PhotoView';
import { PhotoView as NewPhotoView, RocketScan, MultiUnit, MultiUnitRooms } from 'Containers/RocketScan';
import { PhotoShareSplashView } from 'Containers/Public/PhotoShare/PhotoShareSplashView';

// dashboard components
import { CreateProjectMain, Projects } from 'Containers/Projects';
import { People } from 'Containers/People';
import { Crew } from 'Containers/Crew';
import { Project } from 'Containers/Project';
import { ContractFormContainer } from 'Containers/ContractForm/ContractForm';
import { Account, About } from 'Containers/User';
import { ProjectData } from 'Containers/ProjectData';
import { RocketDry } from 'Containers/RocketDry';

// route components
import { PhotoShareProvider } from 'Context/PhotoShare/PhotoShareProvider';

import { ProjectsProvider } from 'Context/Projects';
import { SingleProjectProvider } from 'Context/Project';
import { Notes } from 'Containers/Notes';
import { NotesProvider } from 'Context/Notes';
import { PhotoReport, DryingReport, ReportsAndDocuments } from 'Containers/ReportsAndDocuments';
import { PrivateRoute } from './PrivateRoutes';
import { PublicRoute } from './PublicRoutes';

// Render Props.  Create here to prevent a rerender, on a route change, due to arrow functions always being considered new
const signInHowRoute = () => (
  <GuestWrapper>
    <SignInHow />
  </GuestWrapper>
);
const SignInRoute = () => (
  <GuestWrapper>
    <SignInEmail />
  </GuestWrapper>
);
const SignUpRoute = () => (
  <GuestWrapper>
    <SignUpEmail />
  </GuestWrapper>
);
const ForgotPasswordRoute = () => (
  <GuestWrapper>
    <ForgotPassword />
  </GuestWrapper>
);
const ForgotPasswordEmailSentRoute = () => (
  <GuestWrapper>
    <ForgotPasswordEmailSent />
  </GuestWrapper>
);
const PhoneVerificationRoute = () => (
  <GuestWrapper>
    <PhoneVerification />
  </GuestWrapper>
);
const PhoneVerificationCodeRoute = () => (
  <GuestWrapper>
    <PhoneVerificationCode />
  </GuestWrapper>
);
const SignUpUserInformationRoute = () => (
  <GuestWrapper>
    <SignUpUserInformation />
  </GuestWrapper>
);

const WelcomeAboardRoute = () => (
  <GuestWrapper>
    <WelcomeAboard />
  </GuestWrapper>
);

const WelcomeBackRoute = () => (
  <GuestWrapper>
    <Blocked />
  </GuestWrapper>
);

const NoCompanyRoute = () => (
  <GuestWrapper>
    <NoCompany />
  </GuestWrapper>
);

const SelectAccountTypeRoute = () => (
  <GuestWrapper>
    <SelectAccountType />
  </GuestWrapper>
);
// This route is for a user that clicks on an email reset link.
const ResetPasswordRoute = ({ location: { search } }: any) => {
  // destructure search from location in props.
  const { token, email } = queryString.parse(search.replace('+', '%2B'));
  return (
    <GuestWrapper>
      <ResetPassword token={token} email={email} />
    </GuestWrapper>
  );
};

// dashboard routes - home screen
const DashboardRoute = ({ location: { search } }: any) => {
  // destructure search from location in props.
  const { ft } = queryString.parse(search);
  return (
    <DashboardWrapper isFirstTimer={ft ? Number(ft) === 1 : false}>
      <Dashboard />
    </DashboardWrapper>
  );
};

// Projects related routes
const ProjectsRoute = () => (
  <DashboardWrapper>
    <ProjectsProvider>
      <Projects />
    </ProjectsProvider>
  </DashboardWrapper>
);

// Form related routes
const FormRoute = () => (
  <DashboardWrapper>
    <ProjectsProvider>
      <ContractFormContainer />
    </ProjectsProvider>
  </DashboardWrapper>
);

/*
 * single project routes: tabs specific
 * */
const ProjectRoute = () => (
  <DashboardWrapper>
    <Project />
  </DashboardWrapper>
);
const ProjectPhotoManagementRoute = () => (
  <DashboardWrapper>
    <Project />
  </DashboardWrapper>
);

const CreateProjectRoute = () => (
  <DashboardWrapper>
    <CreateProjectMain />
  </DashboardWrapper>
);
const EditAddressRoute = () => (
  <DashboardWrapper>
    <CreateProjectMain />
  </DashboardWrapper>
);

// people related routes
const PeopleRoute = () => (
  <DashboardWrapper>
    <People />
  </DashboardWrapper>
);

const PhotoViewRoute = () => (
  <PhotoViewWrapper>
    <PhotoView />
  </PhotoViewWrapper>
);

const SignUpFromInviteRoute = () => (
  <GuestWrapper>
    <SignInHow />
  </GuestWrapper>
);
const PhotoShareSplashRoute = () => (
  <SplashPageWrapper>
    <PhotoShareSplashView />
  </SplashPageWrapper>
);

const PhotoShareRoute = () => (
  <PhotoShareWrapper>
    <PhotoShare />
  </PhotoShareWrapper>
);

const PhotoShareGalleryRoute = () => (
  <PhotoViewWrapper>
    <PhotoShareProvider>
      <PhotoShareGallery />
    </PhotoShareProvider>
  </PhotoViewWrapper>
);

const RocketScanRoute = () => (
  <DashboardWrapper>
    <RocketScan />
  </DashboardWrapper>
);

const RocketScanMultiUnitRoute = () => (
  <DashboardWrapper>
    <MultiUnit />
  </DashboardWrapper>
);

const RocketScanCommercialRoute = () => (
  <DashboardWrapper>
    <MultiUnit isCommercialProperty />
  </DashboardWrapper>
);

const AccountRoute = () => (
  <DashboardWrapper>
    <Account />
  </DashboardWrapper>
);

const AboutRoute = () => (
  <DashboardWrapper>
    <About />
  </DashboardWrapper>
);

const RocketScanMultiUnitContentViewRoute = () => (
  <DashboardWrapper>
    <MultiUnitRooms />
  </DashboardWrapper>
);

const RocketScanCommercialRoomsViewRoute = () => (
  <DashboardWrapper>
    <MultiUnitRooms />
  </DashboardWrapper>
);

const AllNotesRoute = () => (
  <DashboardWrapper>
    <NotesProvider>
      <Notes />
    </NotesProvider>
  </DashboardWrapper>
);

const CrewRoute = () => (
  <DashboardWrapper>
    <Crew />
  </DashboardWrapper>
);

const RocketScanPhotoViewRoute = () => (
  <PhotoViewWrapper>
    <SingleProjectProvider>
      <NewPhotoView />
    </SingleProjectProvider>
  </PhotoViewWrapper>
);

const ProjectDataRoute = () => (
  <DashboardWrapper>
    <ProjectData />
  </DashboardWrapper>
);

const RocketReportsRoute = () => (
  <DashboardWrapper>
    <ReportsAndDocuments />
  </DashboardWrapper>
);

const GeneratePhotoReportRoute = () => (
  <DashboardWrapper>
    <PhotoReport />
  </DashboardWrapper>
);

const GenerateDryingReportRoute = () => (
  <DashboardWrapper>
    <DryingReport />
  </DashboardWrapper>
);

const RocketDryRoute = () => (
  <DashboardWrapper>
    <RocketDry />
  </DashboardWrapper>
);

const NotFoundRoute = () => <NotFoundWrapper />;

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/" render={signInHowRoute} />
      <PublicRoute exact path="/signinemail" render={SignInRoute} />
      <PublicRoute exact path="/signupemail" render={SignUpRoute} />
      <PublicRoute exact path="/phoneverification" render={PhoneVerificationRoute} />
      <PublicRoute exact path="/phoneverificationcode" render={PhoneVerificationCodeRoute} />
      <PublicRoute exact path="/signupuserinformation" render={SignUpUserInformationRoute} />
      <PublicRoute exact path="/forgotpassword" render={ForgotPasswordRoute} />
      <PublicRoute exact path="/forgotpassword/emailsent" render={ForgotPasswordEmailSentRoute} />
      <PublicRoute path="/reset-password" render={ResetPasswordRoute} />
      <PublicRoute exact path="/welcomeaboard" render={WelcomeAboardRoute} />
      <PublicRoute exact path="/nocompany" render={NoCompanyRoute} />
      <PublicRoute exact path="/selectaccounttype" render={SelectAccountTypeRoute} />
      <PublicRoute exact path="/invite/:uuid" render={SignUpFromInviteRoute} />

      <PrivateRoute exact path="/photoView" render={PhotoViewRoute} />
      <PrivateRoute path="/dashboard" render={DashboardRoute} />
      <PrivateRoute exact path="/welcomeback" render={WelcomeBackRoute} />
      <PrivateRoute exact path="/projects/create" render={CreateProjectRoute} />
      <PrivateRoute exact path="/projects/editAddress" render={EditAddressRoute} />
      <PrivateRoute exact path="/projects" render={ProjectsRoute} />

      <PrivateRoute exact path="/form" render={FormRoute} />

      <PrivateRoute exact path="/projects/projectDashboard" render={ProjectRoute} />
      <PrivateRoute exact path="/projects/photoManagement/addLocations" render={ProjectPhotoManagementRoute} />
      <PrivateRoute exact path="/projects/photoManagement/allLocations" render={ProjectPhotoManagementRoute} />
      <PrivateRoute exact path="/projects/photoManagement/addLocations/single" render={ProjectPhotoManagementRoute} />
      <PrivateRoute
        exact
        path="/projects/photoManagement/addLocations/multiUnit"
        render={ProjectPhotoManagementRoute}
      />
      <PrivateRoute
        exact
        path="/projects/photoManagement/addLocations/multiUnit/add"
        render={ProjectPhotoManagementRoute}
      />
      <PrivateRoute
        exact
        path="/projects/photoManagement/allLocations/multiUnitView"
        render={ProjectPhotoManagementRoute}
      />

      <PrivateRoute exact path="/projects/:projectId/rocketscan" render={RocketScanRoute} />
      <PrivateRoute
        exact
        path="/projects/:projectId/rocketscan/multiunit/:location"
        render={RocketScanMultiUnitContentViewRoute}
      />
      <PrivateRoute exact path="/projects/:projectId/rocketscan/multiunit" render={RocketScanMultiUnitRoute} />
      <PrivateRoute exact path="/projects/:projectId/rocketscan/photo-view" render={RocketScanPhotoViewRoute} />
      <PrivateRoute exact path="/projects/:projectId/rocketscan/commercial" render={RocketScanCommercialRoute} />
      <PrivateRoute
        exact
        path="/projects/:projectId/rocketscan/commercial/:location"
        render={RocketScanCommercialRoomsViewRoute}
      />

      <PrivateRoute exact path="/projects/:projectId/notes" render={AllNotesRoute} />
      <PrivateRoute exact path="/projects/:projectId/crew" render={CrewRoute} />

      <PrivateRoute exact path="/projects/:projectId/project-data" render={ProjectDataRoute} />
      <PrivateRoute exact path="/projects/:projectId/rocketdry" render={RocketDryRoute} />
      <PrivateRoute exact path="/projects/:projectId/rocketreports" render={RocketReportsRoute} />
      <PrivateRoute exact path="/projects/:projectId/reports/generate/photo" render={GeneratePhotoReportRoute} />
      <PrivateRoute exact path="/projects/:projectId/reports/generate/drying" render={GenerateDryingReportRoute} />

      <PrivateRoute exact path="/people" render={PeopleRoute} />

      <PrivateRoute exact path="/user/account" render={AccountRoute} />
      <PrivateRoute exact path="/user/about" render={AboutRoute} />

      <Route exact path="/photo-share/:uuid/gallery" render={PhotoShareGalleryRoute} />
      <Route exact path="/photo-share/:uuid/view" render={PhotoShareRoute} />
      <Route exact path="/photo-share/:uuid" render={PhotoShareSplashRoute} />

      <Route render={NotFoundRoute} />
    </Switch>
  </BrowserRouter>
);

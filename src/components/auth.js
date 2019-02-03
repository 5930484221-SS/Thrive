import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import LoadingScreen from "./LoadingScreen";

const locationHelper = locationHelperBuilder({});

// export const UserIsAuthenticated = connectedRouterRedirect({
//   wrapperDisplayName: "UserIsAuthenticated",
//   allowRedirectBack: true,
//   redirectPath: (state, ownProps) =>
//     locationHelper.getRedirectQueryParam(ownProps) || "/",
//   authenticatedSelector: ({ register: { isLoading, isInitializing } }) =>
//     !isLoading && isInitializing,
//   authenticatingSelector: ({ register: { isLoading } }) =>
//     isLoading,
//   AuthenticatingComponent: LoadingScreen
// });
//
// export const UserIsNotAuthenticated = connectedRouterRedirect({
//   wrapperDisplayName: "UserIsNotAuthenticated",
//   allowRedirectBack: false,
//   redirectPath: (state, ownProps) =>
//     locationHelper.getRedirectQueryParam(ownProps) || "/register",
//   authenticatedSelector: ({ register: { isLoading, isInitializing } }) =>
//     !isLoading && !isInitializing,
//     authenticatingSelector: ({ register: { isLoading } }) =>
//       isLoading,
//   AuthenticatingComponent: LoadingScreen
// });
//
// export const TeacherIsAuthenticated = connectedRouterRedirect({
//   wrapperDisplayName: "TeacherIsAuthenticated",
//   allowRedirectBack: true,
//   redirectPath: (state, ownProps) =>
//     locationHelper.getRedirectQueryParam(ownProps) || "/loginteacher",
//   authenticatedSelector: ({ register: { teacherIsLoading, teacherIsInitializing } }) =>
//     !teacherIsLoading && teacherIsInitializing,
//   authenticatingSelector: ({ register: { teacherIsLoading } }) =>
//     teacherIsLoading,
//   AuthenticatingComponent: LoadingScreen
// });
//
// export const TeacherIsNotAuthenticated = connectedRouterRedirect({
//   wrapperDisplayName: "TeacherIsNotAuthenticated",
//   allowRedirectBack: false,
//   redirectPath: (state, ownProps) =>
//     locationHelper.getRedirectQueryParam(ownProps) || "/teacherboard",
//   authenticatedSelector: ({ register: { teacherIsLoading, teacherIsInitializing } }) =>
//     !teacherIsLoading && !teacherIsInitializing,
//     authenticatingSelector: ({ register: { teacherIsLoading } }) =>
//       teacherIsLoading,
//   AuthenticatingComponent: LoadingScreen
// });

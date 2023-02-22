export const appInitialLoadingSelector = ({ core: { appInitialLoading: value = true } }: any) => value;
export const appRedirectPathSelector = ({ core: { appRedirectPath: value } }: any) => value;
export const coreFetchingSelector = ({ core: { fetching = false } }: any) => fetching;
export const pusherSelector = ({ core: { pusher: value } }: any) => value;

import React from "react";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";

import Layout from "./layout/layout";
import ProviderContext from "./providerContext/providerContext";
import Store from "./redux/store";
import ErrorBoundary from "./errorBoundary/errorBoundary";

const MyApp = () => {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <App>
          <SnackbarProvider>
            <ZMPRouter>
              <Provider store={Store}>
                <ProviderContext>
                  <Layout />
                </ProviderContext>
              </Provider>
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </ErrorBoundary>
    </RecoilRoot>
  );
};
export default MyApp;

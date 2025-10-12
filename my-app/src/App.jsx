import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import DefaultLayout from "@layouts/DefaultLayout";
import { publicRoutes, privateRoutes } from "@routes";
import PrivateRoute from "@routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { WalletProvider } from "./context/WalletContext ";
import { BalanceProvider } from "./context/BalanceContext";
// import { GroupProvider } from "./context/GroupContext";
function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <BalanceProvider>
            <WalletProvider>
              <div className="App  font-sans">
                <Routes>
                  {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;
                    if (route.layout) {
                      Layout = route.layout;
                    } else if (route.layout === null) {
                      Layout = Fragment;
                    }
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        element={
                          <Layout>
                            <Page />
                          </Layout>
                        }
                      />
                    );
                  })}
                  {privateRoutes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <PrivateRoute
                          component={route.component}
                          layout={route.layout}
                        />
                      }
                    />
                  ))}
                </Routes>
              </div>
            </WalletProvider>
          </BalanceProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

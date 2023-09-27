//next
import { useRouter } from "next/router";

//css
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/loader.css";
import "../styles/AdminLayout.scss";

//react-toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//layout
import Layout from "../components/Layouts/Layout";
import AdminLayout from "../components/Layouts/AdminLayout";

//Redux imports
import { Provider } from "react-redux";
import { persistor, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }) {
  //Admin routes
  const router = useRouter();
  const currentPath = router.pathname;
  const isAdminPath = currentPath.startsWith("/admin");

  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    //     {isAdminPath ? (
    //       <>
    //         <AdminLayout>
    //           <ToastContainer />
    //           <Component {...pageProps} />
    //         </AdminLayout>
    //       </>
    //     ) : (
    //       <>
    //         <Layout>
    //           <ToastContainer />
    //           <Component {...pageProps} />
    //         </Layout>
    //       </>
    //     )}
    //   </PersistGate>
    // </Provider>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AdminLayout>
          <ToastContainer />
          <Component {...pageProps} />
        </AdminLayout>
      </PersistGate>
    </Provider>
  );
}

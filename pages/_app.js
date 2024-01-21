//next
import { useRouter } from "next/router";

//css
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/loader.css";
import "../styles/AdminLayout.scss";

//layout
import Layout from "../components/Layouts/Layout";
import AdminLayout from "../components/Layouts/AdminLayout";

//Redux imports
import { Provider } from "react-redux";
import { persistor, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";

//pdf-viewer
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function App({ Component, pageProps }) {
  //Admin routes
  const router = useRouter();
  const currentPath = router.pathname;
  const isAdminPath = currentPath.startsWith("/admin");

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {isAdminPath ? (
          <>
            <AdminLayout>
              
              <Component {...pageProps} />
            </AdminLayout>
          </>
        ) : (
          <>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </>
        )}
      </PersistGate>
    </Provider>
  );
}
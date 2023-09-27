
import EditPageComponent from "../../../components/Admin/PageComponents/EditPageComponent";

const EditPage = ({ query }) => {
  return (
    <div className="holder-box">
      <EditPageComponent id={query.id} />
    </div>
  );
};

EditPage.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

export default EditPage;
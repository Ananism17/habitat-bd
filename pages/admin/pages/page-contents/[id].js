import EditPageContentComponent from "../../../../components/Admin/PageComponents/PageContentComponents/EditPageContentComponent";

const EditPageContent = ({ query }) => {
  return (
    <div className="holder-box">
      <EditPageContentComponent id={query.id} />
    </div>
  );
};

EditPageContent.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

export default EditPageContent;

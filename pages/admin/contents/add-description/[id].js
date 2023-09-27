import AddDescriptionComponent from "../../../../components/Admin/ContentComponents/AddDescriptionComponent";

const AddDescription = ({ query }) => {
  return (
    <div className="holder-box">
      <AddDescriptionComponent id={query.id} />
    </div>
  );
};

AddDescription.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

export default AddDescription;

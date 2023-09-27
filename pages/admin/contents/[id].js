import EditContentComponent from "../../../components/Admin/ContentComponents/EditContentComponent"

const EditContent = ({ query }) => {
  return (
    <div className="holder-box">
        <EditContentComponent id={query.id} />
    </div>
  )
}

EditContent.getInitialProps = async ({ query }) => {
    return {
      query,
    };
  };

export default EditContent
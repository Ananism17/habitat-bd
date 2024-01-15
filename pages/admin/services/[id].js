import EditServiceComponent from "@/components/Admin/ServiceComponents/EditServiceComponent";

const EditService = ({ query }) => {
  return (
    <div className='holder-box'>
      <EditServiceComponent id={query.id} />
    </div>
  )
}

EditService.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

export default EditService;
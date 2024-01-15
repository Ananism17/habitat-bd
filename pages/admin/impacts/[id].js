import EditImpactComponent from "@/components/Admin/ImpactComponents/EditImpactComponent";

const EditService = ({ query }) => {
  return (
    <div className='holder-box'>
      <EditImpactComponent id={query.id} />
    </div>
  )
}

EditService.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

export default EditService;
import UpdatePledgeComponent from "../../../../components/Admin/PledgeComponents/UpdatePledgeComponent";

const UpdatePledge = ({ query }) => {
  return (
    <div className="holder-box">
        <UpdatePledgeComponent id={query.id} />
    </div>
  )
}

UpdatePledge.getInitialProps = async ({ query }) => {
    return {
      query,
    };
  };

export default UpdatePledge
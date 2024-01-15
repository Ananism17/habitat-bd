import ViewPledgeComponent from "../../../components/Admin/PledgeComponents/ViewPledgeComponent";

const ViewPledge = ({ query }) => {
  return (
    <div className="holder-box">
        <ViewPledgeComponent id={query.id} />
    </div>
  )
}

ViewPledge.getInitialProps = async ({ query }) => {
    return {
      query,
    };
  };

export default ViewPledge
import StoryDetailComponent from "../../components/StoryComponents/StoryDetailComponent";

const StoryDetail = ({ query }) => {
  return (
    <>
      <StoryDetailComponent slug={query.slug} />
    </>
  );
};

StoryDetail.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

export default StoryDetail;

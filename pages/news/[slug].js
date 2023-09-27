import NewsDetailComponent from "../../components/NewsComponents/NewsDetailComponent";

const NewsDetail = ({ query }) => {
  return (
    <>
      <NewsDetailComponent slug={query.slug} />
    </>
  );
};

NewsDetail.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

export default NewsDetail;

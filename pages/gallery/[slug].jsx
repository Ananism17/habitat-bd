import GalleryComponent from "../../components/GalleryComponents/GalleryComponent";

const GalleryImages = ({ query }) => {
  return (
    <>
      <GalleryComponent slug={query.slug} />
    </>
  );
};

GalleryImages.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

export default GalleryImages;

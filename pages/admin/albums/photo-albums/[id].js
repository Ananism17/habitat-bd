import EditPhotoAlbumComponent from "../../../../components/Admin/AlbumComponents/EditPhotoAlbumComponent";

const EditAlbum = ({ query }) => {
  return (
    <div className="holder-box">
      <EditPhotoAlbumComponent id={query.id} />
    </div>
  );
};

EditAlbum.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

export default EditAlbum;

import EditVideoALbumComponent from "../../../../components/Admin/AlbumComponents/EditVideoALbumComponent";

const EditVideoAlbum = ({ query }) => {
  return (
    <div className="holder-box">
      <EditVideoALbumComponent id={query.id}/>
    </div>
  );
};

EditVideoAlbum.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

export default EditVideoAlbum;

import EditSliderComponent from '../../../components/Admin/SliderCommponents/EditSliderComponent'

const EditSliderImage = ({ query }) => {
  return (
    <div className='holder-box'>
      <EditSliderComponent id={query.id} />
    </div>
  )
}

EditSliderImage.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

export default EditSliderImage;
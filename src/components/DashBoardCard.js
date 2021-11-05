import styled from 'styled-components';

const StyledIcon = styled.i`
  font-size: 35px;
`
const DashBoardCard = ({ label, value, unit, icon }) => {
  return (
    <div className='grid-margin' style={{ width: '100%' }}>
      <div className='card'>
        <div className='card-body'>
          <h5 style={{ color: '#fff' }}>{label}</h5>
          <div className='row'>
            <div className='col-8 col-sm-12 col-xl-8 my-auto'>
              <div className='d-flex d-sm-block d-md-flex align-items-center'>
                <h2 className='mb-0' style={{ color: '#fff' }}>{value.toLocaleString()}</h2>
                <p className='text-success ml-2 mb-0 font-weight-medium'>{unit}</p>
              </div>
            </div>
            <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
              <StyledIcon className={`bx ${icon}`}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardCard;
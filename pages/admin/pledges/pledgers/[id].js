import React from "react"

import PledgerListComponent from "../../../../components/Admin/PledgeComponents/PledgerListComponent"

const PledgerList = ({ query }) => {
  return (
    <div className="holder-box">
        <PledgerListComponent id={query.id}/>
    </div>
  )
}

PledgerList.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

export default PledgerList
import Paymentpage from '../../components/Paymentpage'

const page = ({params}) => {
  const decodeuri = decodeURIComponent(params.username)
  
  return (
    <div>
      <Paymentpage username={decodeuri.replace(/\s+/g, "_")}></Paymentpage>
    </div>
  )
}

export default page

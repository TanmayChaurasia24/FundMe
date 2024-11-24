import Paymentpage from '../../components/Paymentpage'

const page = ({params}) => {
  return (
    <div>
      <Paymentpage username={params.username}></Paymentpage>
    </div>
  )
}

export default page

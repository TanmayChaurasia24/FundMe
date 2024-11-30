import UsernamePage from '../../../../components/publicuser'

const page = ({params}: any) => {
  const decodeuri = decodeURIComponent(params.username)
  
  return (
    <div>
      <UsernamePage username={decodeuri.replace(/\s+/g, "_")}></UsernamePage>
    </div>
  )
}

export default page

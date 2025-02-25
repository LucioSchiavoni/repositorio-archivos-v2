import CreatePost from "../components/forms/post/CreateNotas"
import Layout from "../Layout"



const CreatePostPage = () => {
  return (
    <>
    <Layout>
       <div className="w-4/12 m-auto py-24">

       <CreatePost/>
    </div>
    </Layout>
   

    </>
  )
}

export default CreatePostPage
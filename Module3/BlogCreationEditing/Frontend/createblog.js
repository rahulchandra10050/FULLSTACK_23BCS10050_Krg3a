import React , {useState} from 'react';
const CreateBlog = () =>{
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [message,setMessage] = useState("");
    
    const handleCreateBlog = async(e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/blogs/create`,{
                method:"POST",
                headers:{
                    "Content-type" : "application/json",
                    Authorization : `Bearer ${token}`,
                },
                body : JSON.stringify({ title, content }),
            }
            );

            if(response.ok){
                setMessage("Blog Created.")
            }

        } catch (error) {
            console.log(error);
            setMessage("Error : "+error);
        }

        setTitle("");
        setContent("");
    };

    return (
        <div class="CreateBlogDiv">
            <h2>Create Your Own Blog!!</h2>
            
            <form onSubmit={handleCreateBlog}>
                <div class="CreateformDiv">
                    <div class="titleDiv">
                        <label>Title : </label>
                        <input 
                            type="text" 
                            placeholder="Enter the title of your blog.."
                            value={title} 
                            onChange={(e)=>setTitle(e.target.value)}
                        />
                    </div>

                <div class="contentDiv">
                    <label>Content : </label>
                    <input 
                    type="text" 
                    placeholder="Enter the content"
                    value={content} 
                    onChange={(e)=>setContent(e.target.value)}
                    />
                </div>

            </div>
                <div class="createBtn">
                <button class="btn" type="Submit" > Create </button>
                </div>
            </form>

            <p>{message}</p>
        </div>
    );
}
export default CreateBlog;

import react,{useState,useEffect, use} from 'react';

const ProfilePage= () =>{
    const[username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[role,setRoles]=useState([]);
    const[error,setError]=useState("");
     useEffect(() => {
        fetchProfile();
      }, []);

    const fetchProfile = async() =>{
        const token=localStorage.getItem('token');
        try {
            const response=await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/blogs/profile`,{
                method:'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if(response.ok){
                const data=await response.json();
                console.log(data);
                setUsername(data.username);
                setEmail(data.email);
                setRoles(data.roles);
            }
            else{
                setError("Failed to fetch the profile.")
            }
        } catch (error) {
            console.log(error);
            setError("Error in fetching profile");
        }
    }


    return (
  <div className="profile-container">
    <div className="profile-card">
      <h2 className="profile-heading">👤 Profile</h2>
      <hr />
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Roles:</strong> {role.join(", ")}</p>
      {error && <p className="error-text">{error}</p>}
    </div>
  </div>
);

}

export default ProfilePage;
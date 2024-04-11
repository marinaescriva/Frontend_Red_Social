const root = "http://localhost:4000/api/"

export const loginService = async (user) => {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }

    try {
        const response = await fetch(`${root}auth/login`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        return error

    }
}

export const registerService = async (user) => {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }

try {
    const response = await fetch(`${root}auth/register`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        return error

}
}

export const feedService = async (token) => {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

try {
    const response = await fetch(`${root}posts`, options);

        const data = await response.json();
        console.log(data.data)
        if (!data.success) {
            throw new Error(data.message)
        }
        return data.data;
    } catch (error) {
        return {error: true, message: error.message };

}
}

export const getMyOwnPost = async (token) => {

    const options = {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }
    try {
        const response = await fetch(`${root}posts/own`, options);
    
            const data = await response.json();
         
            if (!data.success) {
                throw new Error(data.message)
            }
            return data.data;
        } catch (error) {
            return {error: true, message: error.message };
    
    }

}

export const deletePost = async (postId , token) => {

    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

try {
   
    const response = await fetch(`${root}posts/${postId}`, options);
    
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        return error

}
}

export const myProfile = async (token) => {

    const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    
      try {
        const response = await fetch(`${root}users/profile`, options)
      
        const data = await response.json()
     
        if (!data.success) {
          throw new Error(data.message)
        }
    
        return data.data
    
      } catch (error) {
        return error
      }

}

export const updateProfile = async (token , newData) => {

    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newData)
      }
     
      try {
        const response = await fetch(`${root}users/profile`, options)
    
        const data = await response.json()
    
        if (!data.success) {
          throw new Error(data.message)
        }
    
        return data.data
    
      } catch (error) {
        return error
      }

}

export const likeIt = async (id , token) => {

    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        // body: JSON.stringify(newData)
      }
    
      try {
        const response = await fetch(`${root}posts/like/${id}`, options)
    
        const data = await response.json()
    
        if (!data.success) {
          throw new Error(data.message)
        }
    
        return data.data
    
      } catch (error) {
        return error
      }

}
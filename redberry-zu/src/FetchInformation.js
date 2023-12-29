const token =
  "cca7f7710543ee1dc92911a244d0692b0080fd4477e44c40c61992d3c09d52ce";

const GetBlogs = async () => {
  try {
    const response = await fetch(
      "https://api.blog.redberryinternship.ge/api/blogs",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error("Error making API request:", error);
    throw error;
  }
};

const AddBlog = async (blogData) => {
  try {
    const response = await fetch("https://api.blog.redberryinternship.ge/api/blogs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: blogData,
    });

    return response.status === 204;
  } catch (error) {
    console.error("Error making API request:", error);
    throw error;
  }
};

const GetCategories = async () => {
  try {
    const response = await fetch(
      "https://api.blog.redberryinternship.ge/api/categories",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error making API request:", error);
    throw error;
  }
};

const GetBlogById = async (id) => {
  try {
    const response = await fetch(
      "https://api.blog.redberryinternship.ge/api/blogs/" + id,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error making API request:", error);
    throw error;
  }
};

const Login = async (email) => {
  try {
    const response = await fetch(
      "https://api.blog.redberryinternship.ge/api/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    console.log(response.status);
    if (response.status === 204) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error making login API request:", error);
    throw error;
  }
};



export { GetBlogs, GetCategories, GetBlogById, Login, AddBlog };

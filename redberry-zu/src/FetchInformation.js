const token =
  "e22393ad81c5b10c5dc90b482b8044baf68ee183dc2b811d538d7319a89d0357";

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

export { GetBlogs, GetCategories, GetBlogById, Login };

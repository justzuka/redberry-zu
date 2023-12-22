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
   
    console.log(data.data)
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

export {GetBlogs, GetCategories}
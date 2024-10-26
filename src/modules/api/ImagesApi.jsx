import axios from "axios";
function ImagesApi() {
  const Access_Key = import.meta.env.VITE_UNSPLASH_ACCES_KEY;
  const getImage = async (imgName) => {
    try {
      const url = `https://api.unsplash.com/search/photos?page=1&query=${imgName}&per_page=1&client_id=${Access_Key}`;
      const response = await axios.get(url);
      return response.data.results;
      
    } catch (error) {
      console.error("Error fetching img data:", error);
      return [];
    }
  };
  return { getImage };
}

export default ImagesApi;

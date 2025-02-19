import axios from 'axios';

export default async function getPosts() {
    let results = null;
    try {
        const response = await axios.get('https://fiap-blog-backend-latest.onrender.com/posts');
        const data = response.data;
        results = [data];
    } catch(error) {
        console.error(error);
    }
    
    return results;
}
import axios from 'axios';

export default async function getPosts() {
    let results = null;
    try {
        const response = await axios.get('https://localhost:3000/');
        const data = response.data;
        results = [data];
    } catch(error) {
        console.error(error);
    }
    
    return results;
}
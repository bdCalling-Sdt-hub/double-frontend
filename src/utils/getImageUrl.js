import { baseUrl } from '../redux/features/baseApi';

const getImageUrl = (url) => {
        if (typeof url === 'string' && url) {
                if (url.startsWith('http')) {
                        return url;
                } else {
                        return `${baseUrl}${url}`;
                }
        }
        return '';
};

export default getImageUrl;

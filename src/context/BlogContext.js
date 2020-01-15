import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const DELETE_BLOGPOST = 'delete_blogpost';
const EDIT_BLODGPOST = 'edit_blogpost';
const GET_BLOGPOSTS = 'get_blogposts';

const INITIAL_STATE = [];

/**
 * reducer fucntion
 * @param {state} state 
 * @param {action} action 
 */
const blogReducer = (state, action) => {
    switch(action.type) {
        case GET_BLOGPOSTS:
            return action.payload;

        case DELETE_BLOGPOST:
            return state.filter((blogPost) => blogPost.id !== action.payload);

        case EDIT_BLODGPOST:
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id
                ? action.payload
                : blogPost
            });

        default:
            return state;
    }
}

// Actions ---------------------------------------------------------------
/**
 * action function for add new blog post
 */
const addBlogPost = (dispatch) => {
    return async (title, content, callBack) => {
        await jsonServer.post('/blogposts', { title, content });

        if (callBack) {
            callBack();
        }
    };
    // return (title, content, callBack) => {
    //     dispatch({ 
    //         type: ADD_BLOGPOST,
    //         payload: { title, content }
    //     });
    //     if (callBack) {
    //         callBack();
    //     }
    // };
};

/**
 * action function for delete a specific blog post
 */
const deleteBlogPost = (dispatch) => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`)

        dispatch({ type: DELETE_BLOGPOST, payload: id })
    };
    // return (id) => {
    //     dispatch({
    //         type: DELETE_BLOGPOST,
    //         payload: id
    //     });
    // };
};

/**
 * action function for edit a specific blog post
 */
const editBlogPost = (dispatch) => {
    return async (id, title, content, callBack) => {
        await jsonServer.put(`/blogposts/${id}`, { title, content });

        dispatch({
            type: EDIT_BLODGPOST,
            payload: { id, title, content }
        });
        if (callBack) {
            callBack();
        }
    }
}

const getBlogPosts = (dispatch) => {
    return async () => {
        const response = await jsonServer.get('/blogposts');

        dispatch({ type: GET_BLOGPOSTS, payload: response.data });
    }
}

// const BlogProvider = ({ children }) => {

//     const [state, dispatch] = useReducer(blogReducer, INITIAL_STATE);

//     // const [blogPosts, setBlogPosts] = useState([]);

//     // const addBlogPosts = () => {
//     //     setBlogPosts([...blogPosts, { title: `My Blog ${blogPosts.length + 1}` }]);
//     // }

//     const addBlogPost = () => {
//         dispatch({ type: 'add_blogpost' });
//     }

//     return <BlogContext.Provider value={{ data: state, addBlogPost }}>
//         {children}
//     </BlogContext.Provider>
// }

// export { BlogProvider };
// export default BlogContext;

export const { Context, Provider } = createDataContext(
    blogReducer, 
    { 
        addBlogPost,
        deleteBlogPost,
        editBlogPost,
        getBlogPosts
    }, 
    INITIAL_STATE);
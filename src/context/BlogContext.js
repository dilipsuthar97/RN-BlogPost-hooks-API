import createDataContext from './createDataContext';

const ADD_BLOGPOST = 'add_blogpost';
const DELETE_BLOGPOST = 'delete_blogpost';
const EDIT_BLODGPOST = 'edit_blogpost';

const INITIAL_STATE = [
    {
        id: 1,
        title: "Title",
        content: "Content"
    }
];

/**
 * reducer fucntion
 * @param {state} state 
 * @param {action} action 
 */
const blogReducer = (state, action) => {
    switch(action.type) {
        case ADD_BLOGPOST:
            return [...state, {
                id: Math.floor(Math.random() * 99999),
                title: action.payload.title,
                content: action.payload.content
            }];

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
    return (title, content, callBack) => {
        dispatch({ 
            type: ADD_BLOGPOST,
            payload: { title, content }
        });
        if (callBack) {
            callBack();
        }
    };
};

/**
 * action function for delete a specific blog post
 */
const deleteBlogPost = (dispatch) => {
    return (id) => {
        dispatch({
            type: DELETE_BLOGPOST,
            payload: id
        });
    };
};

/**
 * action function for edit a specific blog post
 */
const editBlogPost = (dispatch) => {
    return (id, title, content, callBack) => {
        dispatch({
            type: EDIT_BLODGPOST,
            payload: { id, title, content }
        });
        if (callBack) {
            callBack();
        }
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
        editBlogPost
    }, 
    INITIAL_STATE);
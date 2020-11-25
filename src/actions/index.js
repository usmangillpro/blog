import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // userIds.forEach((id) => dispatch(fetchUser(id)));

  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();
  /*
    Chain method chains all the methods under it and at value()
    function it is executed...
  */
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({
    type: "FETCH_POSTS",
    payload: response.data,
  });
};

/*
While using {lodash memoize} function, We cannot get updated 
data from api. This is just a solution to fetch data and reduce 
fetch requests from network api... It let's us reduce requests from
the same api number... like user/1 or user/2, gets only one time request and 
memoizes it for the next time request...
*/
/*
export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);
const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({
    type: "FETCH_USER",
    payload: response.data,
  });
});
*/

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3300",
});

// sign up
export const signup = (user) => API.post("/user/register", user);

// sign in
export const signin = (user) => API.post("/user/login", user);

// add user's subjects
export const addSubjects = (request, token) =>
  API.patch(
    "/user/addInfo",
    request,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

//  get user's subjects
export const getUserSubjects = (token) =>
  API.get(
    "/user/getInfo",
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

// get subject from ID

export const getSubjectFromId = (subjectId, token) =>
  API.get(
    `/subject/getSubject?id=${subjectId}`,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

// get posts

export const getPosts = (token) =>
  API.get(
    "/post/list",
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

// get user posts

export const getUserPosts = (id, token) =>
  API.get(
    `/post/creator/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

// get trending posts

export const getTrendingPosts = (token) =>
  API.get(
    "/post/trending",
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

// post creation
export const createPost = (post, token) =>
  API.post(
    "/post/create",
    post,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

// community creation
export const createCommunity = (community, token) =>
  API.post(
    "/community/create",
    community,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

//Get subjects
export const getSubjects = (token) =>
  API.get(
    "/subject/list",
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

// Get Communities
export const getCommunities = (token) =>
  API.get(
    "/community/getAll",
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

// get user's communities

export const getUserCommunities = (id, token) =>
  API.get(
    `/community/getUser?id=${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

// get community by ID

export const getCommunityById = (id, token) =>
  API.get(
    `/community/get?id=${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

// get community by name

export const getCommunityByName = (title, token) =>
  API.get(
    `/community/search?title=${title}`,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

//  get posts of community

export const getCommunityPosts = (id, token) =>
  API.get(
    `/community/posts?id=${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

//Generate schedule
export const generateSchedule = (request, token) =>
  API.post(
    "/schedule/create",
    request,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

//Newslet
export const getNews = (token) =>
  API.get(
    "/event/getEvents",
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

// Update User Rating
export const updateTeachRating = (request, token) => {
  API.post(
    "/user/rating",
    request,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );
};

export const getTeachers = (request, token) =>
  API.get(
    `/subject/bestTeachers?name=${request}`,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

export const getUser = (id) => API.get(`/user/getUser?id=${id}`);

export const getUserByToken = (token) =>
  API.get(
    `/user/getByToken`,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

export const createSlot = (slot, token) =>
  API.post(
    "/slot/create",
    slot,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

export const getSlots = (id, token) =>
  API.get(
    `/slot/getSlot?id=${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

export const getUserSlots = (token) =>
  API.get(
    "/user/getUserSlot",
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );
const apiendpoints = {
  getUser: {
    path: "/auth/getUser",
    method: "GET"
  },
  login: {
    path: "/auth/login",
    method: "POST"
  }
};

const baseURL = "http://localhost:5000";

export default async function handler(req, res) {
  const body = req.body;
  const query = req.query;
  const headers = req.headers;
  const uri = `${baseURL}${apiendpoints[body.path].path}`;
  const apiOptions = body.data
    ? {
      method: apiendpoints[body.path].method,
      headers: {
        "Content-Type": "application/json",
        Authorization: headers.authorization
      },
      body: JSON.stringify(req.body.data)
    }
    : {
      method: apiendpoints[body.path].method,
      headers: {
        "Content-Type": "application/json",
        Authorization: headers.authorization
      }
    };
  let data = await fetch(uri, apiOptions);
  data = await data.json();
  res.status(200).json(data);
}

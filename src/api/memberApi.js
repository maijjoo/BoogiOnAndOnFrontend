import api from "./commonApi";

const prefix = "/member/login";

export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("username", loginParam.username);
  form.append("password", loginParam.password);

  try {
    const res = await api.post(prefix, form, header);
    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

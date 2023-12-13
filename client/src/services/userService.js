const baseUrl = "http://localhost:3030/jsonstore/users";

export const getAllUsers = async () => {
  const response = await fetch(`${baseUrl}`);

  return response.json();
};

export const findUserById = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);

  return response.json();
};

export const findUserByEmail = async (email) => {
  return Object.values(await getAllUsers()).find(
    (user) => user.email === email
  );
};

export const findUserByUsername = async (username) => {
  return Object.values(await getAllUsers()).find(
    (user) => user.username === username
  );
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${baseUrl}/${userId}`, {
    method: "DELETE",
  });

  return response.json();
};

import httpService from "./http.service";

const todosEndpoint = "todos/";

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: { _page: 1, _limit: 2 },
    });
    return data;
  },
  createTask: async () => {
    const { data } = await httpService.post(todosEndpoint, {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        title: "excepturi deleniti adipisci voluptatem et neque optio illum ad",
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const response = JSON.parse(data.body);

    return {
      userId: response.userId,
      id: data.id,
      title: response.title,
      completed: response.completed,
    };
  },
};

export default todosService;

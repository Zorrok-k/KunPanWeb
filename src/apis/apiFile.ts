import service from "@/utils/request";

export const build = async () => {
  return service.get("/file/build");
};

export const read = async (path: string, num: number, page: number) => {
  return service.get("/file/read", {
    params: {
      path: path,
      num: num,
      page: page,
    },
  });
};

export const add = (path: string, formData: FormData) => {
  return service.post("/file/add", formData, {
    params: {
      path: path,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

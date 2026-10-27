const API_URL = "http://192.168.10.100:3500";

export async function loginApi(
  login: string,
  password: string,
): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });

    console.log("Resposta fetch:",  response);

    // if (!response.ok) {
    //   return false;
    // }

    const data = await response.json();

    console.log("Resposta API:", data);

    return data.success === true;
  } catch (error) {
    console.error("Erro ao acessar API:", error);

    return false;
  }
}
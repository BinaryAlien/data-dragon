import https from "https";

async function fetch(path: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const url = new URL(path, "https://ddragon.leagueoflegends.com");
    const request = https.get(url, (response) => {
      if (response.statusCode !== 200) {
        response.resume();
        reject(
          new Error(
            `${url.host}: ${response.statusCode} ${response.statusMessage}`,
          ),
        );
        return;
      }
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });
    request.on("error", reject);
    request.end();
  });
}

export default fetch;

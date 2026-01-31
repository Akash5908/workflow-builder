import https from "https";

export const sendTelegramMessage = async (
  token: string,
  chatId: string,
  message: string,
) => {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ chat_id: chatId, text: message });

    const options = {
      hostname: "api.telegram.org",
      port: 443,
      path: `/bot${token}/sendMessage`,
      method: "POST",
      family: 4, // FORCE IPv4
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve(JSON.parse(data));
      });
    });

    req.on("error", reject);
    req.setTimeout(10000, () => req.destroy());
    req.write(postData);
    req.end();
  });
};

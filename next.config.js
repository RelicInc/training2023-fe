/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Swagger でレスポンスを受け取る場合に必要
        // これでいけるはずだが、なぜか[id].tsx という命名の API ではうまく動作せず
        // 工数がかけれられないので一旦これですみません... 
        "source": "/(.*)",
        "headers": [
          { "key": "Access-Control-Allow-Origin", "value": "*" },
          { "key": "Access-Control-Allow-Methods", "value": "*" },
          { "key": "Access-Control-Allow-Headers", "value": "*" },
        ]
      }
    ]
  },
}

module.exports = nextConfig

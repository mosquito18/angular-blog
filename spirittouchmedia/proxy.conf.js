const PROXY_CONFIG = [
  {
    context: [
      "/activate",
    ],
    target: "http://localhost:3000",
    secure: false
  }
]
module.exports = PROXY_CONFIG;
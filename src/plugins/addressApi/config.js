
const token = '680202e1bf6ce1a1317591657b8371ff7288aef1';

export default {
  url: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Token " + token
  }
}
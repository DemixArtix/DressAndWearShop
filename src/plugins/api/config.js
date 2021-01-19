export default {
  url: 'http://localhost:8081',
  headers: {
    'Authorization': localStorage.getItem('token'),
    'Content-Type': 'application/json',
  }
}
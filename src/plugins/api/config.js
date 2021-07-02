export default {
  // url: 'http://localhost:8081',
  url: 'http://188.225.87.145:8081',
  headers: {
    'Authorization': localStorage.getItem('token'),
    'Content-Type': 'application/json',
  }
}
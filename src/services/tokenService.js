import { Buffer } from "buffer"

function setToken(token) {
  localStorage.setItem('token', token)
}

function getUserFromToken() {
  const token = getToken()
  return token ? JSON.parse(Buffer.from(token.split('.')[1], 'base64')).user : null
}

function getToken() {
  let token = localStorage.getItem('token')
  if (token) {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64'))
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token')
      token = null
    }
  } else {
    localStorage.removeItem('token')
  }
  return token
}

function removeToken() {
  localStorage.removeItem('token')
}

export {
  setToken,
  getUserFromToken,
  removeToken,
  getToken
}
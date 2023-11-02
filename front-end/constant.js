import process from 'process'
export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://192.168.1.3:5000' : 'http://localhost:5000'
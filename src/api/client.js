import axios from 'axios'
import { parse } from 'js-yaml'

// En un entorno real, se cargaría el archivo yaml de manera diferente
// Esta es una implementación simplificada para la POC
export async function loadApiSpec () {
  try {
    // En una aplicación real, usaríamos webpack o vite para importar el yaml
    const response = await fetch('/api-contract/api-spec.yaml')
    const yamlText = await response.text()
    return parse(yamlText)
  } catch (error) {
    console.error('Error loading API spec:', error)
    return null
  }
}

export class ApiClient {
  constructor (baseURL = 'http://localhost:8000/api') {
    this.baseURL = baseURL
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async getUsers () {
    try {
      const response = await this.client.get('/users/')
      return response.data
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  async getUserById (id) {
    try {
      const response = await this.client.get(`/users/${id}/`)
      return response.data
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error)
      throw error
    }
  }
}

export default new ApiClient()

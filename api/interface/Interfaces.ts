export interface User {
  id?: number
  name?: string
  email?: string
  password?: string
}

export interface Deploy {
  id?: number
  secret?: string
  email?: string
  apiIdFk?: number
  userIdFk?: number
}

export interface Container {
  id?: number
  order?: number
  config?: object
  deployIdFk?: number
  userIdFk?: number
}

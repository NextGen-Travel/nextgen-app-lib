import { config } from './config'
import { Exception } from 'power-helper'

export const serviceException = new Exception(config.libName)

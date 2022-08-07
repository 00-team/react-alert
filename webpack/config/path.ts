import { resolve } from 'path'

const BASE_DIR = resolve(__dirname, '../../')
const SRC_DIR = resolve(BASE_DIR, 'src')
const LIB_DIR = resolve(BASE_DIR, 'lib')
const DEMO_DIR = resolve(BASE_DIR, 'demo')

export { BASE_DIR, LIB_DIR, DEMO_DIR, SRC_DIR, resolve }

import { customAlphabet } from 'nanoid'

export const generateUniqueString = (length) => {
    const nanoid = customAlphabet('12345abcd', length || 10)
    return nanoid()
}
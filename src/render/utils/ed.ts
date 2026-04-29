import CryptoJS from 'crypto-js'

const SECRET_KEY_B64 = import.meta.env.VITE_APP_SECRET_KEY as string

// 生成随机IV
export const generateIV = () => {
  return CryptoJS.lib.WordArray.random(16)
}
export const stringIV = (iv: any) => {
  return iv.toString(CryptoJS.enc.Base64)
}
export const parseIV = (iv: any) => {
  return CryptoJS.enc.Base64.parse(iv)
}

// AES加密
export const encryptValue = (value: any, iv: any) => {
  const encrypted = CryptoJS.AES.encrypt(value, CryptoJS.enc.Base64.parse(SECRET_KEY_B64), {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const ivAndCiphertext = iv.clone().concat(encrypted.ciphertext)
  return ivAndCiphertext.toString(CryptoJS.enc.Base64)
}

// AES解密
export const decryptValue = (base64Str: any) => {
  try {
    // 1. 将 Base64 字符串还原为字节数组
    const rawData = CryptoJS.enc.Base64.parse(base64Str)

    // 2. 提取前 16 个字节作为 IV
    const ivWords = rawData.words.slice(0, 4) // 4 words = 16 bytes
    const extractedIV = CryptoJS.lib.WordArray.create(ivWords, 16)

    // 3. 提取剩余部分作为真正的密文
    const ciphertextWords = rawData.words.slice(4)
    const ciphertext = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.lib.WordArray.create(ciphertextWords)
    })

    // 4. 执行解密
    const decrypted = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Base64.parse(SECRET_KEY_B64), {
      iv: extractedIV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })

    return decrypted.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error('解密失败，请检查密钥或数据格式:', error)
    return
  }
}

// 测试代码
// const iv = generateIV()
// const encrypted = encryptValue('Hello, World!', iv)
// console.log('Encrypted:', encrypted)

// const decrypted = decryptValue(encrypted)
// console.log('Decrypted:', decrypted)

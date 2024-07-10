// composables/useCrypto.js

/**
 * Generates a cryptographic key from a passphrase using SHA-256.
 * @param {string} passphrase - The passphrase to generate the key from.
 * @returns {Promise<Uint8Array>} The cryptographic key.
 */
async function getKeyFromPassphrase(passphrase) {
    const encoder = new TextEncoder();
    const data = encoder.encode(passphrase);
    const hash = await crypto.subtle.digest('SHA-256', data); // This gives a 256-bit hash.
    return new Uint8Array(hash);
}

/**
 * Encrypts data using AES-GCM with a passphrase.
 * @param {string} passphrase - The passphrase used to generate encryption key.
 * @param {string} data - The plaintext data to encrypt.
 * @returns {Promise<Object>} The encrypted data with ciphertext and IV.
 */
export async function encryptData(passphrase, data) {
    try {
        const secretKey = await getKeyFromPassphrase(passphrase);
        const encoded = new TextEncoder().encode(data);
        const key = await crypto.subtle.importKey("raw", secretKey, "AES-GCM", false, ["encrypt"]);
        const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
        const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
        return {
            ciphertext: Array.from(new Uint8Array(encrypted)), // Convert buffer to byte array
            iv: Array.from(iv) // Convert IV to byte array for storage
        };
    } catch (error) {
        console.error("Encryption failed:", error);
        throw new Error("Encryption failed");
    }
}

/**
 * Decrypts data using AES-GCM with a passphrase.
 * @param {string} passphrase - The passphrase used to generate decryption key.
 * @param {Object} encryptedData - The encrypted data containing the ciphertext and IV.
 * @returns {Promise<string>} The decrypted data as plaintext.
 */
export async function decryptData(passphrase, encryptedData) {
    try {
        const { ciphertext, iv } = encryptedData;
        const secretKey = await getKeyFromPassphrase(passphrase);
        const key = await crypto.subtle.importKey("raw", secretKey, "AES-GCM", false, ["decrypt"]);
        const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: new Uint8Array(iv) }, key, new Uint8Array(ciphertext));
        return new TextDecoder().decode(decrypted);
    } catch (error) {
        console.error("Decryption failed:", error);
        throw new Error("Decryption failed");
    }
}

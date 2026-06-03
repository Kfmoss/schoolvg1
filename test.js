import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";
import { has } from './rest.js';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const genAI = new GoogleGenerativeAI(has);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const spm = "hva er "; 
const spm2 = ", Kan du forklare forrige forklsring enda enklere?";
let lastQuestion =" ";



// Helper function to pause execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Global helper function to fetch data from Gemini with 503 error retries.
 * @param {string} prompt - The question to send to Gemini
 * @param {number} retries - Maximum number of attempts
 * @param {number} delayMs - Initial delay before retrying
 * @returns {Promise<string>} The text response from the model
 * @param {string} LastQst - keep the last question in order to "omformulering" and prompt it again.
 */
async function spørGemini(prompt, retries = 3, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      // Core Gemini API call logic
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      return text; // Return the text if successful
      
    } catch (error) {
      // Check if it's a 503 error (Service Unavailable)
      if (error.message?.includes('503') && i < retries - 1) {
        console.warn(`Gemini busy (503). Retrying in ${delayMs}ms... (Attempt ${i + 1}/${retries})`);
        await delay(delayMs);
        delayMs *= 2; // Exponential backoff: Double the wait time
        continue;
      }
      
      // If it's a different error, or we ran out of retries, log and throw it
      console.error("Houston, we have a problem:", error);
      throw error;
    }
  }
}
// --- END OF INTEGRATED RETRY LOGIC ---


// Event listener for the first button
const btn_send = document.getElementById('btn_send1').addEventListener("click", async () => {
    const qst = spm + "DOM HTML, forklar dette kort";
    const displayWindow = document.getElementById('_window'); // Renamed variable to avoid breaking global window object

    try {
        // Call the centralized function
        const textResponse = await spørGemini(qst);
        displayWindow.innerHTML = marked.parse(textResponse);
        lastQuestion = qst;
    } catch (error) {
        displayWindow.innerHTML = `<p style="color:red;">Klarte ikke å hente svar fra Gemini etter flere forsøk.</p>`;
    }
});

const btn_send2 = document.getElementById('btn_send2').addEventListener("click", async () => {
    const qst = spm + "metadata i HTML, forklar dette kort";
    const displayWindow = document.getElementById('_window'); // Renamed variable to avoid breaking global window object

    try {
        // Call the centralized function
        const textResponse = await spørGemini(qst);
        displayWindow.innerHTML = marked.parse(textResponse);
        lastQuestion = qst;
    } catch (error) {
        displayWindow.innerHTML = `<p style="color:red;">Klarte ikke å hente svar fra Gemini etter flere forsøk.</p>`;
    }
});





// Event listener for the second button
const btn_response_nei = document.getElementById('btn_send6').addEventListener("click", async () => {

    const qst = spm2+lastQuestion;
    const displayWindow = document.getElementById('_window'); 

    try {
        // Call the centralized function

        const textResponse = await spørGemini(qst);
        displayWindow.innerHTML = marked.parse(textResponse);
    } catch (error) {
        displayWindow.innerHTML = `<p style="color:red;">Klarte ikke å hente svar fra Gemini etter flere forsøk.</p>`;
    }
});













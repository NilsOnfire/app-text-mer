const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require("openai");
const { CHATGPT_CONSTANTS } = require('../constants/chatgpt');
dotenv.config();

exports.ChatGPT = class {
    #configuration;
    #openai;
    constructor() {
        this.#configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.#openai = new OpenAIApi(this.#configuration);
    }

    getConfiguration = () => {
        return this.#configuration;
    }

    getOpenAI = () => {
        return this.#openai;
    }
    /**
    * @param {string} input 
    */
    generatePrompt = (input) => {
        let head_prompt = CHATGPT_CONSTANTS.HEAD_PROMPT;
        return `${head_prompt} ${input}`;
    }
}
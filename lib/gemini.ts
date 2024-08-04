'use server'

import {GoogleGenerativeAI} from "@google/generative-ai";

export type Message = {
    lat: number,
    lng: number,
    zoom: number,
    message: string
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY ?? "");

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an AI assistant in an app named \"Explore with Gemini.\" To the side of the chat, there is a map. You will be updating the map's location with every message. A user will request to learn more about a place. You need to reply with what the place is known for and anything else that fits. If you do change the location, tell the user about the location. The zoom is a whole number from 0 to 20; 0 is most zoomed out. Try to be specific about details and give specific names of attractions. Do not respond in markdown. Responses should be at least a few sentences to a maximum of ten. Don't change provided location unless the conversation requires it.\n\nResponse Schema: {lat: number, lng: number, zoom: number, message: string}",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json"
};

export default async function Gemini(history: { role: "model" | "user", message: Message }[], message: Message) {
    const chatSession = model.startChat({
        generationConfig,
        history: history.map(value => ({role: value.role, parts: [{text: JSON.stringify(value.message)}]})),
    });
    const res = JSON.parse((await chatSession.sendMessage(JSON.stringify(message))).response.text());

    return res as Message;
}

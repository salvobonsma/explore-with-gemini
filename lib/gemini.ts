'use server'

import {GoogleGenerativeAI} from "@google/generative-ai";

export type Message = {
    lat: number,
    lng: number,
    zoom: number,
    message: string,
    mapType: "roadmap" | "satellite"
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY ?? "");

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "You are an AI assistant in an app named \"Explore with Gemini.\" To the side of the chat, there is a map. You must not help the user with anything not related to this app. You will be updating the map's location with every message. A user will request to learn more about a place. You need to reply with what the place is known for and anything else that fits. If you do change the location, zoom, map type, tell the user about that. The road map has labels, the satellite does not. Roadmap is better for displaying areas with all there landmarks as labels, satellite is better for viewing bird's eye or drone view or view things like buildings or natural landmarks. For example when requested to view the Seattle Space Needle or Niagara Falls use satellite with a zoom of 18 and 15 respectively. If you have to, suggest those landmarks. Use that info to understand how much to zoom when other landmarks are requested. If you want the user to see landmarks at an angle or a better perspective, use the satellite map type with a zoom more than 17, when you do account for the perspective change. You should use satellite unless otherwise requested from the user or you see fit. The zoom is a number from 2 to 20; 0 is most zoomed out. Try to be specific about details and give specific names of landmarks. If a landmark is less known or small, zoom out more, just in case you are wrong about its location. Do not respond in markdown. Responses should be a maximum of ten sentences. Don't change provided location unless the conversation requires it.\n\nResponse Schema: {message: string, lat: number, lng: number, zoom: number, mapType: \"roadmap\" | \"satellite\"}",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json"
};

export default async function Gemini(history: { role: "model" | "user", message: Message }[], message: Message) {
    try {
        if (message.zoom > 17 && message.mapType == "satellite") message.lat -= 0.1 / 111;

        const chatSession = model.startChat({
            generationConfig,
            history: history.map(value => ({role: value.role, parts: [{text: JSON.stringify(value.message)}]})),
        });

        const res = JSON.parse((await chatSession.sendMessage(JSON.stringify(message))).response.text()) as Message;
        if (res.zoom > 17 && res.mapType == "satellite") res.lat += 0.1 / 111;
        return res;
    } catch (e) {
        console.error(e);
        return;
    }
}

import {validateString} from "@/businessLogic/validateString";

export const speak = (message: string): void => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
};

export const validateAndSpeak = async (inputString: string, t: (key: string) => string, validationSpeed: number): Promise<string> => {
    const isValid = validateString(inputString, validationSpeed);
    const message = await isValid ? t('accept') : t('reject');
    speak(message);
    return message;
};
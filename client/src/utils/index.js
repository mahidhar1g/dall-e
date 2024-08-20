import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants';

export function getRandomprompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomprompt = surpriseMePrompts[randomIndex];

    if (randomprompt === prompt) return getRandomprompt(prompt);

    return randomprompt;
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
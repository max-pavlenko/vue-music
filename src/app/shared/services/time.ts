export class Time {
   static dateIntl = new Intl.DateTimeFormat();
   
    static format(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

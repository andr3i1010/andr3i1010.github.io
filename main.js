// ...existing code...
function addTerminalText(text, typewriter) {
    const textContainer = document.querySelector('.text');
    if (typewriter) {
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                textContainer.innerHTML += text.charAt(index);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 50); // Adjust typing speed as needed
    } else {
        textContainer.innerHTML += text;
    }
}
// ...existing code...

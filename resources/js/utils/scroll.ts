export function scrollToTop(smooth = true) {
    window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto',
    });
}

export function scrollToElement(elementId: string, smooth = true, offset = 0) {
    const element = document.getElementById(elementId);

    if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
            top,
            behavior: smooth ? 'smooth' : 'auto',
        });
    }
}

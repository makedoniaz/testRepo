export const ScrollPageToTop = (isSmooth = false) => {
    window.scrollTo({
        top: 0,
        behavior: isSmooth ? 'smooth' : 'auto',
    });
}
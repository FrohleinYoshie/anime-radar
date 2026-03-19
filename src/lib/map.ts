export function generateMapLink(location: string) {
    const url = `https://www.google.com/maps/search/${encodeURIComponent(location)}`
    return url
}
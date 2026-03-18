import { CATEGORIES } from "@/constants";

export function getCategoryColor(category:string) {
    const result = CATEGORIES.find(CATEGORY => category === CATEGORY.name)
    if (result) {
        return result.color
    } else {
        return null
    }
}

export function getCategorySlug(category:string) {
    const result = CATEGORIES.find(CATEGORY => category === CATEGORY.name)
    if (result) {
        return result.slug
    } else {
        return null
    }
}

export function getCategoryFromSlug(slug:string) {
    const result = CATEGORIES.find(CATEGORY => slug === CATEGORY.slug)
    if (result) {
        return result.name
    } else {
        return null
    }
}

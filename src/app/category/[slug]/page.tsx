import { getAllCategories, getEventsByCategory } from "@/lib/db"
import { getCategorySlug, getCategoryFromSlug } from "@/lib/category"
import { notFound } from "next/navigation"
import EventList from "@/components/event/EventList"

export async function generateStaticParams() {
    const categories = await getAllCategories()
    return categories.map((category) => (
        {slug: getCategorySlug(category.category)}
    ))
}

export async function generateMetadata({ params }: { params: { slug: string}}) {
    const categoryName = getCategoryFromSlug(params.slug)
    return {
        title: categoryName,
        description: `${categoryName}のイベント情報`
    }
}

export default async function CategoryPage({params}: {params: {slug: string}}) {
    const { slug } = await params
    const categoryName = getCategoryFromSlug(slug)
    if (!categoryName) {
        notFound()
    }
    const categoryEvents = await getEventsByCategory(categoryName)
    return (
        <>
        <h1>{categoryName}</h1>
        <EventList events={categoryEvents}/>
        </>
    )
}
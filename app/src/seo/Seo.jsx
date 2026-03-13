import { useEffect } from 'react'
import { buildCanonicalUrl, buildPageTitle, getSeoDefaults } from './seo.js'

const MANAGED_ATTRIBUTE = 'data-seo-managed'

function setMetaTag(selector, attributes, content) {
    let element = document.head.querySelector(selector)

    if (!element) {
        element = document.createElement('meta')
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value)
        })
        element.setAttribute(MANAGED_ATTRIBUTE, 'true')
        document.head.appendChild(element)
    }

    element.setAttribute('content', content)
}

function setLinkTag(rel, href) {
    let element = document.head.querySelector(`link[rel="${rel}"]`)

    if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        element.setAttribute(MANAGED_ATTRIBUTE, 'true')
        document.head.appendChild(element)
    }

    element.setAttribute('href', href)
}

function removeTag(selector) {
    document.head.querySelector(selector)?.remove()
}

function clearStructuredData() {
    document.head
        .querySelectorAll(`script[type="application/ld+json"][${MANAGED_ATTRIBUTE}="true"]`)
        .forEach((element) => element.remove())
}

function appendStructuredData(structuredData) {
    const items = Array.isArray(structuredData) ? structuredData : [structuredData]

    items
        .filter(Boolean)
        .forEach((item) => {
            const script = document.createElement('script')
            script.type = 'application/ld+json'
            script.setAttribute(MANAGED_ATTRIBUTE, 'true')
            script.textContent = JSON.stringify(item)
            document.head.appendChild(script)
        })
}

function Seo({
    title,
    description,
    path = '/',
    type = 'website',
    image = '',
    noindex = false,
    structuredData,
}) {
    useEffect(() => {
        const { siteName, defaultDescription } = getSeoDefaults()
        const resolvedTitle = buildPageTitle(title)
        const resolvedDescription = String(description ?? defaultDescription).trim() || defaultDescription
        const canonicalUrl = buildCanonicalUrl(path)
        const robots = noindex ? 'noindex,nofollow' : 'index,follow'

        document.title = resolvedTitle

        setMetaTag('meta[name="description"]', { name: 'description' }, resolvedDescription)
        setMetaTag('meta[name="robots"]', { name: 'robots' }, robots)
        setMetaTag('meta[property="og:type"]', { property: 'og:type' }, type)
        setMetaTag('meta[property="og:site_name"]', { property: 'og:site_name' }, siteName)
        setMetaTag('meta[property="og:title"]', { property: 'og:title' }, resolvedTitle)
        setMetaTag('meta[property="og:description"]', { property: 'og:description' }, resolvedDescription)
        setMetaTag('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl)
        setMetaTag('meta[name="twitter:card"]', { name: 'twitter:card' }, image ? 'summary_large_image' : 'summary')
        setMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' }, resolvedTitle)
        setMetaTag('meta[name="twitter:description"]', { name: 'twitter:description' }, resolvedDescription)

        if (image) {
            setMetaTag('meta[property="og:image"]', { property: 'og:image' }, image)
            setMetaTag('meta[name="twitter:image"]', { name: 'twitter:image' }, image)
        } else {
            removeTag('meta[property="og:image"]')
            removeTag('meta[name="twitter:image"]')
        }

        setLinkTag('canonical', canonicalUrl)
        clearStructuredData()

        if (structuredData) {
            appendStructuredData(structuredData)
        }
    }, [description, image, noindex, path, structuredData, title, type])

    return null
}

export default Seo

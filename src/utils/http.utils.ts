export default async function Http({
    url,
    method,
    body,
}: {
    url: string
    method: string
    body?: string
}) {
    const res = await fetch(url, { method, body })
    const json = await res?.json()
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    return json
}

export function extractNextSince(linkHeader: string | null): number | undefined {
    if (!linkHeader) return undefined
    const match = linkHeader.match(/<[^>]+[?&]since=(\d+)>; rel="next"/)
    return match ? parseInt(match[1], 10) : undefined
}
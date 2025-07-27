
class RateLimitManager {
    resetTime: number | null;
    remaining: number;
    constructor() {
        this.resetTime = null;
        this.remaining = 30; // GitHub's rate limit
    }

    updateFromHeaders(headers: any) {
        this.remaining = parseInt(headers.get('x-ratelimit-remaining') || '60');
        this.resetTime = parseInt(headers.get('x-ratelimit-reset') || '0') * 1000;
    }

    async checkRateLimit() {
        if (this.remaining <= 1 && this.resetTime) {
            const now = Date.now();
            const waitTime = this.resetTime - now;

            if (waitTime > 0) {
                await new Promise(resolve => setTimeout(resolve, waitTime + 1000)); // Add 1s buffer
            }
        }
    }
}

export const rateLimitManager = new RateLimitManager();

import fetch from 'node-fetch';
import { loadEnvConfig } from "@next/env";
loadEnvConfig("");

async function checkRateLimitStatus(token?: string) {
  console.log("token: "+token)
  const headers = token ? { Authorization: `token ${token}` } : undefined;
  const response = await fetch('https://api.github.com/rate_limit', { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch rate limit status: ${response.statusText}`);
  }

  const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
  const rateLimitReset = response.headers.get('x-ratelimit-reset');

  console.log(`Rate limit remaining: ${rateLimitRemaining}`);

  if (rateLimitReset) {
    console.log(`Rate limit reset time: ${new Date(parseInt(rateLimitReset) * 1000).toLocaleString()}`);
  } else {
    console.log('Rate limit reset time not available');
  }
  
}

// Usage example:
const githubToken = process.env.GITHUB_TOKEN || undefined; // Replace with your token or leave it undefined for unauthenticated requests
checkRateLimitStatus(githubToken).catch(console.error);

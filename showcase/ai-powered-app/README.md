# AI-Powered App Starter

This starter is a blog writing assistant. The important architecture choice is that the browser sends notes to your own backend, and your backend calls the AI provider.

That protects your API key and gives you one place to add rate limits, logging, retries, and output validation.

## First Feature

Input:
- Rough notes.
- Target audience.
- Tone.

Output:
- Blog title ideas.
- Outline.
- Tags.
- Short draft intro.


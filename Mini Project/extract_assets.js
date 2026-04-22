const fs = require('fs');
const https = require('https');
const path = require('path');

const inputPath = 'C:/Users/ASUS/.gemini/antigravity/brain/38cf70a8-df31-440c-b0bc-24149b80c62b/.system_generated/steps/485/output.txt';
const imagesDir = path.join(__dirname, 'frontend', 'src', 'assets', 'images');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

fs.readFile(inputPath, 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading input:', err);
        return;
    }

    const payload = JSON.parse(data);
    let imageCount = 0;

    for (const screen of payload.screens) {
        if (screen.htmlCode && screen.htmlCode.downloadUrl) {
            console.log(`Fetching HTML for ${screen.title}...`);
            try {
                const html = await new Promise((resolve, reject) => {
                    https.get(screen.htmlCode.downloadUrl, res => {
                        let body = '';
                        res.on('data', d => body += d);
                        res.on('end', () => resolve(body));
                        res.on('error', reject);
                    }).on('error', reject);
                });

                // Regex to find image srcs: src="https://images.unsplash.com..." etc
                const imgRegex = /src=["'](https?:\/\/[^"']+)["']/g;
                let match;
                while ((match = imgRegex.exec(html)) !== null) {
                    const url = match[1];
                    if (url.includes('images.unsplash.com') || url.includes('placeholder.com')) {
                        // Basic download logic could go here, but logging is safer first
                        console.log('Found image URL:', url);
                        imageCount++;
                    }
                }
            } catch (e) {
                console.error('Failed fetching', e);
            }
        }
    }

    console.log(`Finished checking. Found ${imageCount} external reference URLs.`);
});

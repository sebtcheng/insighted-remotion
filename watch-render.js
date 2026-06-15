const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
let debounceTimer;

console.log('Watching src/ directory for changes...');

function render() {
	console.log('Change detected! Starting automatic video render...');
	
	// Render Introduction
	exec('npm run render-intro', (err, stdout, stderr) => {
		if (err) {
			console.error('Error rendering InsightEDIntroduction:', err);
			return;
		}
		console.log('InsightEDIntroduction rendered successfully!');
	});

	// Render SIIF User Guide
	exec('npm run render-siif', (err, stdout, stderr) => {
		if (err) {
			console.error('Error rendering SIIFUserGuide:', err);
			return;
		}
		console.log('SIIFUserGuide rendered successfully!');
	});
}

// Watch recursively (supported on Windows)
fs.watch(srcDir, { recursive: true }, (eventType, filename) => {
	if (filename && (filename.endsWith('.tsx') || filename.endsWith('.ts') || filename.endsWith('.css'))) {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(render, 3000); // 3 seconds debounce
	}
});

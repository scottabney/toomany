const QRCode = require('qrcode');

let qrCodeDataUrl = null;

// Update color text displays
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        document.getElementById('foreground').addEventListener('input', (e) => {
            document.getElementById('fgColorText').textContent = e.target.value;
        });

        document.getElementById('background').addEventListener('input', (e) => {
            document.getElementById('bgColorText').textContent = e.target.value;
        });

        // Update size display
        document.getElementById('qrSize').addEventListener('input', (e) => {
            document.getElementById('sizeValue').textContent = e.target.value;
        });
    });
}

window.setTemplate = function(type) {
    const textarea = document.getElementById('qrText');
    const typeSelect = document.getElementById('inputType');

    switch(type) {
        case 'url':
            typeSelect.value = 'text';
            textarea.value = 'https://example.com';
            break;
        case 'text':
            typeSelect.value = 'text';
            textarea.value = 'Hello! This is a QR code.';
            break;
        case 'contact':
            typeSelect.value = 'contact';
            textarea.value = 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:+1234567890\nEMAIL:john@example.com\nEND:VCARD';
            break;
        case 'payment':
            typeSelect.value = 'payment';
            textarea.value = 'https://paypal.me/username';
            break;
    }
    window.updatePlaceholder();
}

window.updatePlaceholder = function() {
    const type = document.getElementById('inputType').value;
    const textarea = document.getElementById('qrText');

    switch(type) {
        case 'text':
            textarea.placeholder = 'Enter URL or any text';
            break;
        case 'contact':
            textarea.placeholder = 'BEGIN:VCARD\nVERSION:3.0\nFN:Name\nTEL:Phone\nEMAIL:Email\nEND:VCARD';
            break;
        case 'payment':
            textarea.placeholder = 'Enter payment link (PayPal, Venmo, etc.)';
            break;
    }
}

window.generateQR = async function() {
    const text = document.getElementById('qrText').value.trim();
    
    if (!text) {
        const qrcodeDiv = document.getElementById('qrcode');
        qrcodeDiv.innerHTML = '<span class="empty-state" style="color: #f56565;">Please enter some content to generate QR code</span>';
        return;
    }

    const qrcodeDiv = document.getElementById('qrcode');
    const size = parseInt(document.getElementById('qrSize').value);
    const foreground = document.getElementById('foreground').value;
    const background = document.getElementById('background').value;

    try {
        // Generate QR code as data URL
        qrCodeDataUrl = await QRCode.toDataURL(text, {
            width: size,
            margin: 2,
            color: {
                dark: foreground,
                light: background
            },
            errorCorrectionLevel: 'H'
        });

        // Display the QR code - create img element securely
        const img = document.createElement('img');
        img.src = qrCodeDataUrl;
        img.alt = 'QR Code';
        img.style.cssText = 'border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);';
        qrcodeDiv.innerHTML = '';
        qrcodeDiv.appendChild(img);

        // Show download button
        document.getElementById('downloadBtn').style.display = 'block';
    } catch (err) {
        console.error('Error generating QR code:', err);
        qrcodeDiv.innerHTML = '<span class="empty-state" style="color: #f56565;">Error: Failed to generate QR code. Please check your input.</span>';
    }
}

window.downloadQR = function() {
    if (!qrCodeDataUrl) {
        const qrcodeDiv = document.getElementById('qrcode');
        qrcodeDiv.innerHTML = '<span class="empty-state" style="color: #f56565;">Please generate a QR code first</span>';
        return;
    }

    // Create download link
    const a = document.createElement('a');
    a.href = qrCodeDataUrl;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

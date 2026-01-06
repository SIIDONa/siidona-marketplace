// Customer Post Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('customer-post-form');
    const imageUploadArea = document.getElementById('image-upload-area');
    const imageInput = document.getElementById('product-images');
    const imagePreview = document.getElementById('image-preview');
    const formMessage = document.getElementById('form-message');
    
    let selectedImages = [];

    // Image upload area click
    if (imageUploadArea) {
        imageUploadArea.addEventListener('click', function() {
            imageInput.click();
        });
    }

    // Handle image selection
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            
            files.forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        selectedImages.push({
                            file: file,
                            dataUrl: e.target.result
                        });
                        displayImagePreviews();
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
        });
    }

    // Display image previews
    function displayImagePreviews() {
        if (!imagePreview) return;
        
        imagePreview.innerHTML = '';
        
        selectedImages.forEach((image, index) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            
            previewItem.innerHTML = `
                <img src="${image.dataUrl}" alt="Preview ${index + 1}">
                <button type="button" class="preview-remove" onclick="removeImage(${index})">×</button>
            `;
            
            imagePreview.appendChild(previewItem);
        });
    }

    // Remove image function (global scope)
    window.removeImage = function(index) {
        selectedImages.splice(index, 1);
        displayImagePreviews();
    };

    // Form submission
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate images
            if (selectedImages.length === 0) {
                showMessage('እባክዎን ቢያንስ አንድ ፎቶ ይጨምሩ!', 'error');
                return;
            }

            // Get form data
            const formData = {
                sellerName: sanitizeInput(document.getElementById('seller-name').value),
                sellerPhone: sanitizeInput(document.getElementById('seller-phone').value),
                productName: sanitizeInput(document.getElementById('product-name').value),
                category: document.getElementById('product-category').value,
                price: document.getElementById('product-price').value,
                condition: document.getElementById('product-condition').value,
                description: sanitizeInput(document.getElementById('product-description').value),
                location: sanitizeInput(document.getElementById('product-location').value),
                images: selectedImages.length,
                timestamp: new Date().toISOString()
            };

            // Validate phone number
            if (!validatePhoneNumber(formData.sellerPhone)) {
                showMessage('እባክዎን ትክክለኛ የስልክ ቁጥር ያስገቡ!', 'error');
                return;
            }

            // In production, send to backend API
            console.log('Customer post data:', formData);
            console.log('Images:', selectedImages);

            // Show success message
            showMessage('✅ ምርትዎ በተሳካ ሁኔታ ተልኳል!\n\nምርትዎ በቅርቡ ይለጠፋል። በ24 ሰዓት ውስጥ እናረጋግጥዎታለን።', 'success');
            
            // Reset form
            postForm.reset();
            selectedImages = [];
            displayImagePreviews();

            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    function showMessage(text, type) {
        if (!formMessage) return;

        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 8000);
    }

    function validatePhoneNumber(phone) {
        // Ethiopian phone number validation
        const phoneRegex = /^(09|07|\+2519|\+2517)[0-9]{8}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    function sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
});

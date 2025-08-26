// DOM Elements
const notificationForm = document.getElementById('notificationForm');
const resultsContainer = document.getElementById('results');

// API Base URL
const API_BASE = window.location.origin;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Factory Pattern Demo Web App loaded!');
    
    // Add form submit event listener
    notificationForm.addEventListener('submit', handleFormSubmit);
    
    // Add some example notifications on load
    setTimeout(() => {
        addExampleNotifications();
    }, 1000);
});

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const notificationData = {
        type: formData.get('type'),
        to: formData.get('to'),
        message: formData.get('message')
    };
    
    // Show loading state
    const submitButton = event.target.querySelector('.btn-send');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<div class="loading"></div> Gönderiliyor...';
    submitButton.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE}/api/send-notification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            addResultItem(result, notificationData.type);
            showSuccessMessage('Bildirim başarıyla gönderildi!');
            event.target.reset();
        } else {
            addErrorItem(result.error, notificationData.type);
            showErrorMessage(result.error);
        }
        
    } catch (error) {
        console.error('Error:', error);
        addErrorItem('Bağlantı hatası oluştu', notificationData.type);
        showErrorMessage('Bağlantı hatası oluştu. Lütfen tekrar deneyin.');
    } finally {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

// Add result item to the results container
function addResultItem(result, type) {
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item success';
    
    const typeLabel = getTypeLabel(type);
    const timestamp = new Date(result.timestamp).toLocaleTimeString('tr-TR');
    
    resultItem.innerHTML = `
        <div class="result-header">
            <span class="result-type">${typeLabel}</span>
            <span class="result-time">${timestamp}</span>
        </div>
        <div class="result-message">${result.result}</div>
    `;
    
    // Remove empty state if exists
    const emptyState = resultsContainer.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    // Add to top of results
    resultsContainer.insertBefore(resultItem, resultsContainer.firstChild);
    
    // Limit results to 10 items
    const resultItems = resultsContainer.querySelectorAll('.result-item');
    if (resultItems.length > 10) {
        resultItems[resultItems.length - 1].remove();
    }
}

// Add error item to the results container
function addErrorItem(error, type) {
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item error';
    
    const typeLabel = getTypeLabel(type);
    const timestamp = new Date().toLocaleTimeString('tr-TR');
    
    resultItem.innerHTML = `
        <div class="result-header">
            <span class="result-type">${typeLabel} (Hata)</span>
            <span class="result-time">${timestamp}</span>
        </div>
        <div class="result-message">${error}</div>
    `;
    
    // Remove empty state if exists
    const emptyState = resultsContainer.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    // Add to top of results
    resultsContainer.insertBefore(resultItem, resultsContainer.firstChild);
}

// Get type label with icon
function getTypeLabel(type) {
    const typeLabels = {
        'sms': '📱 SMS',
        'email': '📧 Email',
        'push': '🔔 Push Notification'
    };
    return typeLabels[type] || type;
}

// Show success message
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

// Show error message
function showErrorMessage(message) {
    showNotification(message, 'error');
}

// Show notification toast
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#f56565'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add example notifications
function addExampleNotifications() {
    const examples = [
        {
            type: 'sms',
            to: '+90 5xx xxx xx xx',
            message: 'Kodunuz: 1234'
        },
        {
            type: 'email',
            to: 'kisi@example.com',
            message: 'Hoş geldiniz!'
        },
        {
            type: 'push',
            to: 'user_42',
            message: 'Yeni mesajınız var.'
        }
    ];
    
    examples.forEach((example, index) => {
        setTimeout(() => {
            const mockResult = {
                success: true,
                result: `${example.type.toUpperCase()} -> ${example.to}: ${example.message}`,
                timestamp: new Date(Date.now() - (examples.length - index) * 60000).toISOString()
            };
            addResultItem(mockResult, example.type);
        }, index * 500);
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);

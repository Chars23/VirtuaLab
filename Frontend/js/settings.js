
document.addEventListener('DOMContentLoaded', function() {
    const settingsForm = document.getElementById('settingsForm');
    let editMode = {};
    
    // Initialize edit functionality
    window.editField = function(fieldType) {
        const field = document.getElementById(fieldType);
        const editBtn = document.querySelector(`[onclick="editField('${fieldType}')"]`);
        
        if (fieldType === 'phone') {
            editPhoneField();
            return;
        }
        
        if (fieldType === 'password') {
            editPasswordField();
            return;
        }
        
        if (!editMode[fieldType]) {
            // Enter edit mode
            field.readOnly = false;
            field.focus();
            field.select();
            editBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
            `;
            editMode[fieldType] = true;
            
            // Change input background to indicate edit mode
            field.parentElement.style.background = 'rgba(255, 255, 255, 0.25)';
        } else {
            // Save changes
            field.readOnly = true;
            editBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            `;
            editMode[fieldType] = false;
            
            field.parentElement.style.background = 'rgba(255, 255, 255, 0.15)';
            showNotification(`${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} updated successfully!`, 'success');
        }
    };
    
    function editPhoneField() {
        const phoneSection = document.querySelector('.phone-section');
        const phoneDisplay = document.querySelector('.phone-display');
        const phoneEditBtn = document.querySelector('.phone-edit');
        const phoneNumber = document.querySelector('.phone-number');
        
        if (!editMode.phone) {
            // Create input field
            const input = document.createElement('input');
            input.type = 'tel';
            input.value = phoneNumber.textContent;
            input.style.cssText = `
                background: transparent;
                border: none;
                color: white;
                font-size: 1rem;
                font-weight: 500;
                outline: none;
                width: 100%;
            `;
            
            phoneNumber.style.display = 'none';
            phoneDisplay.appendChild(input);
            input.focus();
            input.select();
            
            phoneEditBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
            `;
            
            phoneSection.style.background = 'rgba(255, 255, 255, 0.25)';
            editMode.phone = true;
        } else {
            // Save changes
            const input = phoneDisplay.querySelector('input');
            phoneNumber.textContent = input.value;
            phoneNumber.style.display = 'block';
            input.remove();
            
            phoneEditBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            `;
            
            phoneSection.style.background = 'rgba(255, 255, 255, 0.15)';
            editMode.phone = false;
            showNotification('Phone number updated successfully!', 'success');
        }
    }
    
    function editPasswordField() {
        const passwordSection = document.querySelector('.password-section');
        const passwordDisplay = document.querySelector('.password-display');
        const passwordEditBtn = document.querySelector('.password-edit');
        const passwordMasked = document.querySelector('.password-masked');
        
        if (!editMode.password) {
            // Create input field
            const input = document.createElement('input');
            input.type = 'password';
            input.placeholder = 'Enter new password';
            input.style.cssText = `
                background: transparent;
                border: none;
                color: white;
                font-size: 1rem;
                outline: none;
                width: 100%;
                margin-top: 0.25rem;
            `;
            
            passwordMasked.style.display = 'none';
            passwordDisplay.appendChild(input);
            input.focus();
            
            passwordEditBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
            `;
            
            passwordSection.style.background = 'rgba(255, 255, 255, 0.25)';
            editMode.password = true;
        } else {
            // Save changes
            const input = passwordDisplay.querySelector('input');
            if (input.value.length < 6) {
                showNotification('Password must be at least 6 characters long', 'error');
                return;
            }
            
            passwordMasked.textContent = '*'.repeat(input.value.length);
            passwordMasked.style.display = 'block';
            input.remove();
            
            passwordEditBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            `;
            
            passwordSection.style.background = 'rgba(255, 255, 255, 0.15)';
            editMode.password = false;
            showNotification('Password updated successfully!', 'success');
        }
    }
    
    window.editName = function() {
        const nameSpan = document.querySelector('.profile-name-edit span');
        const editBtn = document.querySelector('.profile-name-edit .edit-btn');
        
        if (!editMode.name) {
            // Create input
            const input = document.createElement('input');
            input.type = 'text';
            input.value = nameSpan.textContent;
            input.style.cssText = `
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 10px;
                color: white;
                font-size: 1.5rem;
                font-weight: 600;
                padding: 0.5rem;
                outline: none;
            `;
            
            nameSpan.style.display = 'none';
            nameSpan.parentElement.insertBefore(input, editBtn);
            input.focus();
            input.select();
            
            editBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
            `;
            
            editMode.name = true;
        } else {
            // Save changes
            const input = document.querySelector('.profile-name-edit input');
            nameSpan.textContent = input.value;
            nameSpan.style.display = 'inline';
            input.remove();
            
            editBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            `;
            
            editMode.name = false;
            showNotification('Name updated successfully!', 'success');
        }
    };
    
    // Handle form submission
    settingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const saveBtn = this.querySelector('.save-btn');
        const originalText = saveBtn.textContent;
        
        saveBtn.textContent = 'Saving...';
        saveBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('All changes saved successfully!', 'success');
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
        }, 1500);
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            ${type === 'success' ? 'background: rgba(16, 185, 129, 0.9);' : ''}
            ${type === 'error' ? 'background: rgba(239, 68, 68, 0.9);' : ''}
            ${type === 'info' ? 'background: rgba(59, 130, 246, 0.9);' : ''}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    // Add entrance animations
    const elements = document.querySelectorAll('.profile-section, .form-section');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
});

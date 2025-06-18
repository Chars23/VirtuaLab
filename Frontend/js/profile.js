
document.addEventListener('DOMContentLoaded', function() {
    // Add entrance animations
    const profileElements = document.querySelectorAll('.profile-header, .stats-section, .project-card');
    
    profileElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('h3').textContent;
            showNotification(`Opening ${projectTitle}`, 'info');
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add hover effects to stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.stat-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.stat-icon');
            icon.style.transform = '';
        });
        
        item.addEventListener('click', function() {
            const percentage = this.querySelector('.stat-percentage').textContent;
            showNotification(`System performance: ${percentage}`, 'success');
        });
    });
    
    // Terminal animation
    const terminals = document.querySelectorAll('.terminal-body');
    terminals.forEach(terminal => {
        const prompt = terminal.querySelector('.terminal-prompt');
        if (prompt) {
            // Add typewriter effect
            setTimeout(() => {
                typeCommand(prompt, 'ls -la');
            }, Math.random() * 2000 + 1000);
        }
    });
    
    function typeCommand(element, command) {
        let index = 0;
        const originalContent = element.innerHTML;
        
        function type() {
            if (index < command.length) {
                element.innerHTML = originalContent + command.slice(0, index + 1);
                index++;
                setTimeout(type, 100 + Math.random() * 50);
            } else {
                setTimeout(() => {
                    element.innerHTML = originalContent;
                    setTimeout(() => typeCommand(element, command), 5000);
                }, 3000);
            }
        }
        
        type();
    }
    
    // Profile avatar interaction
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar) {
        profileAvatar.addEventListener('click', function() {
            showNotification('Profile picture update coming soon!', 'info');
            
            // Add pulse animation
            this.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    }
    
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
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .project-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
        }
        
        .stat-item {
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stat-icon {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .profile-avatar {
            cursor: pointer;
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});


document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  
  // Toggle sidebar
  window.toggleSidebar = function() {
      sidebar.classList.toggle('active');
      mainContent.classList.toggle('shifted');
      hamburgerMenu.classList.toggle('active');
  };
  
  // Close sidebar when clicking outside
  document.addEventListener('click', function(e) {
      if (!sidebar.contains(e.target) && !hamburgerMenu.contains(e.target) && sidebar.classList.contains('active')) {
          toggleSidebar();
      }
  });
  
  // Project toggle functionality
  window.toggleProject = function(element) {
      const projectItem = element.closest('.project-item') || element.closest('.project-sub-item');
      const projectFiles = projectItem.querySelector('.project-files');
      const chevron = element.querySelector('.chevron');
      
      if (projectFiles) {
          projectFiles.classList.toggle('expanded');
          element.classList.toggle('expanded');
          
          if (chevron) {
              if (projectFiles.classList.contains('expanded')) {
                  chevron.style.transform = 'rotate(90deg)';
              } else {
                  chevron.style.transform = 'rotate(0deg)';
              }
          }
      }
  };
  
  // OS card launch functionality
  window.launchOS = function(osType) {
      const osCard = event.currentTarget;
      const osName = osCard.querySelector('h3').textContent;
      
      // Add click animation
      osCard.style.transform = 'scale(0.95)';
      setTimeout(() => {
          osCard.style.transform = '';
      }, 150);
      
      showNotification(`Launching ${osName}...`, 'info');
      
      // Simulate OS launch
      setTimeout(() => {
          showNotification(`${osName} is ready!`, 'success');
      }, 2000);
  };
  
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
  
  // Add hover effects to OS cards
  const osCards = document.querySelectorAll('.os-card');
  osCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = '';
      });
  });
  
  // File item interactions
  const fileItems = document.querySelectorAll('.file-item');
  fileItems.forEach(item => {
      item.addEventListener('click', function() {
          const fileName = this.textContent.trim();
          showNotification(`Opening ${fileName}`, 'info');
          
          // Add selection effect
          fileItems.forEach(f => f.classList.remove('selected'));
          this.classList.add('selected');
      });
  });
  
  // Chat bot functionality
  const chatBot = document.querySelector('.chat-bot');
  if (chatBot) {
      chatBot.addEventListener('click', function() {
          showNotification('Chat assistant is coming soon!', 'info');
          
          // Add bounce animation
          this.style.transform = 'scale(1.2)';
          setTimeout(() => {
              this.style.transform = '';
          }, 200);
      });
  }
  
  // Add CSS for selected file items
  const style = document.createElement('style');
  style.textContent = `
      .file-item.selected {
          background: rgba(255, 255, 255, 0.2);
          border-left: 3px solid #60A5FA;
      }
      
      .os-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .project-toggle:active {
          transform: scale(0.98);
      }
      
      .sidebar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
      }
      
      .sidebar::-webkit-scrollbar {
          width: 6px;
      }
      
      .sidebar::-webkit-scrollbar-track {
          background: transparent;
      }
      
      .sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
      }
      
      .sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
      }
  `;
  document.head.appendChild(style);
  
  // Add welcome animation
  setTimeout(() => {
      showNotification('Welcome to VirtuaLab!', 'success');
  }, 1000);
});
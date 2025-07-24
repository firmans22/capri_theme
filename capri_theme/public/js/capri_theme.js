// Capri Turquoise Theme JavaScript with Dark Mode Support
frappe.ready(function() {
    console.log('Capri Turquoise Theme loaded successfully!');
    
    // Add theme class to body for additional styling
    document.body.classList.add('capri-turquoise-theme');
    
    // Dark mode detection and handling
    function handleDarkMode() {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            updateIconsForDarkMode();
            updateTextForDarkMode();
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    
    // Update icons for dark mode
    function updateIconsForDarkMode() {
        const icons = document.querySelectorAll('.icon, .octicon, .fa, .fas, .far, .fab, svg');
        icons.forEach(icon => {
            if (!icon.style.color) {
                icon.style.color = '#3949ab'; // Dark blue for icons
            }
            
            // Add hover effect
            icon.addEventListener('mouseenter', function() {
                this.style.color = '#66E6D8'; // Turquoise light on hover
                this.style.transition = 'color 0.3s ease';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.color = '#3949ab'; // Back to dark blue
            });
        });
    }
    
    // Update text colors for dark mode
    function updateTextForDarkMode() {
        const textElements = document.querySelectorAll('p, span, div, label, h1, h2, h3, h4, h5, h6');
        textElements.forEach(element => {
            if (!element.style.color && !element.classList.contains('text-primary')) {
                element.style.color = '#e3f2fd'; // Light blue text
            }
        });
        
        // Special handling for muted text
        const mutedElements = document.querySelectorAll('.text-muted');
        mutedElements.forEach(element => {
            element.style.color = '#90caf9'; // Light blue muted
        });
    }
    
    // Enhanced hover effects for list items
    function enhanceListItems() {
        const listItems = document.querySelectorAll('.list-row, .grid-row');
        listItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.01)';
                const isDarkMode = document.body.classList.contains('dark-mode');
                if (isDarkMode) {
                    this.style.boxShadow = '0 4px 15px rgba(26, 35, 126, 0.4)';
                } else {
                    this.style.boxShadow = '0 4px 15px rgba(64, 224, 208, 0.3)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Enhanced button effects with dark mode support
    function enhanceButtons() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (!this.disabled) {
                    this.style.transform = 'translateY(-2px)';
                    const isDarkMode = document.body.classList.contains('dark-mode');
                    if (isDarkMode && this.classList.contains('btn-primary')) {
                        this.style.boxShadow = '0 6px 20px rgba(26, 35, 126, 0.6)';
                    }
                }
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Add smooth transitions to cards with dark mode support
    function enhanceCards() {
        const cards = document.querySelectorAll('.card, .widget, .frappe-card');
        cards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
            
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                const isDarkMode = document.body.classList.contains('dark-mode');
                if (isDarkMode) {
                    this.style.boxShadow = '0 8px 25px rgba(26, 35, 126, 0.5)';
                } else {
                    this.style.boxShadow = '0 8px 25px rgba(64, 224, 208, 0.3)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                const isDarkMode = document.body.classList.contains('dark-mode');
                if (isDarkMode) {
                    this.style.boxShadow = '0 4px 15px rgba(26, 35, 126, 0.3)';
                } else {
                    this.style.boxShadow = '0 4px 15px rgba(64, 224, 208, 0.2)';
                }
            });
        });
    }
    
    // Listen for dark mode changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleDarkMode);
    
    // Initial setup
    setTimeout(() => {
        handleDarkMode();
        enhanceListItems();
        enhanceButtons();
        enhanceCards();
    }, 500);
    
    // Re-apply enhancements when new content is loaded
    $(document).on('page-change', function() {
        setTimeout(() => {
            handleDarkMode();
            enhanceListItems();
            enhanceButtons();
            enhanceCards();
        }, 500);
    });
    
    // Add gradient animation to primary buttons with dark mode support
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        button.style.backgroundSize = '200% 100%';
        button.style.transition = 'all 0.3s ease';
        
        button.addEventListener('mouseenter', function() {
            this.style.backgroundPosition = 'right center';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.backgroundPosition = 'left center';
        });
    });
    
    // Dark mode toggle function (optional)
    window.toggleDarkMode = function() {
        const isDark = document.body.classList.contains('dark-mode');
        if (isDark) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme-mode', 'light');
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme-mode', 'dark');
            updateIconsForDarkMode();
            updateTextForDarkMode();
        }
        
        // Re-enhance elements for new mode
        setTimeout(() => {
            enhanceListItems();
            enhanceButtons();
            enhanceCards();
        }, 100);
    };
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateIconsForDarkMode();
        updateTextForDarkMode();
    }
});

// Custom theme selector integration with dark mode support
frappe.provide('frappe.ui.theme_switcher');

frappe.ui.theme_switcher.show_theme_switcher = function() {
    const themes = [
        { name: 'Light', value: 'light' },
        { name: 'Dark', value: 'dark' },
        { name: 'Capri Turquoise', value: 'capri_turquoise' },
        { name: 'Capri Turquoise Dark', value: 'capri_turquoise_dark' }
    ];
    
    const dialog = new frappe.ui.Dialog({
        title: __('Select Theme'),
        fields: [
            {
                fieldtype: 'Select',
                fieldname: 'theme',
                label: __('Theme'),
                options: themes.map(t => t.name).join('\n'),
                default: frappe.boot.user.theme || 'Light'
            },
            {
                fieldtype: 'Check',
                fieldname: 'dark_mode',
                label: __('Enable Dark Mode'),
                default: document.body.classList.contains('dark-mode') ? 1 : 0
            }
        ],
        primary_action_label: __('Apply'),
        primary_action: function(values) {
            const selectedTheme = themes.find(t => t.name === values.theme);
            if (selectedTheme) {
                frappe.call({
                    method: 'frappe.core.doctype.user.user.set_user_theme',
                    args: { theme: selectedTheme.value },
                    callback: function() {
                        // Apply dark mode if selected
                        if (values.dark_mode) {
                            document.body.classList.add('dark-mode');
                            localStorage.setItem('theme-mode', 'dark');
                        } else {
                            document.body.classList.remove('dark-mode');
                            localStorage.setItem('theme-mode', 'light');
                        }
                        
                        frappe.show_alert({
                            message: __('Theme updated successfully'),
                            indicator: 'green'
                        });
                        location.reload();
                    }
                });
            }
            dialog.hide();
        }
    });
    
    dialog.show();
};

// Override default theme switching
$(document).ready(function() {
    // Add theme selector to user menu
    if (frappe.user.name !== 'Guest') {
        setTimeout(() => {
            const userMenu = document.querySelector('.dropdown-menu[data-user]');
            if (userMenu) {
                const themeOption = document.createElement('a');
                themeOption.className = 'dropdown-item';
                themeOption.href = '#';
                themeOption.innerHTML = '<i class="fa fa-paint-brush" style="color: #3949ab;"></i> Change Theme';
                themeOption.onclick = function(e) {
                    e.preventDefault();
                    frappe.ui.theme_switcher.show_theme_switcher();
                };
                
                const darkModeToggle = document.createElement('a');
                darkModeToggle.className = 'dropdown-item';
                darkModeToggle.href = '#';
                darkModeToggle.innerHTML = '<i class="fa fa-moon" style="color: #3949ab;"></i> Toggle Dark Mode';
                darkModeToggle.onclick = function(e) {
                    e.preventDefault();
                    window.toggleDarkMode();
                };
                
                userMenu.appendChild(themeOption);
                userMenu.appendChild(darkModeToggle);
            }
        }, 1000);
    }
});

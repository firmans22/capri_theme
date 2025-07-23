// Capri Turquoise Theme JavaScript
frappe.ready(function() {
    console.log('Capri Turquoise Theme loaded successfully!');
    
    // Add theme class to body for additional styling
    document.body.classList.add('capri-turquoise-theme');
    
    // Enhanced hover effects for list items
    function enhanceListItems() {
        const listItems = document.querySelectorAll('.list-row, .grid-row');
        listItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.01)';
                this.style.boxShadow = '0 4px 15px rgba(64, 224, 208, 0.3)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Enhanced button effects
    function enhanceButtons() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (!this.disabled) {
                    this.style.transform = 'translateY(-2px)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Add smooth transitions to cards
    function enhanceCards() {
        const cards = document.querySelectorAll('.card, .widget, .frappe-card');
        cards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
            
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(64, 224, 208, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(64, 224, 208, 0.2)';
            });
        });
    }
    
    // Apply enhancements
    setTimeout(() => {
        enhanceListItems();
        enhanceButtons();
        enhanceCards();
    }, 500);
    
    // Re-apply enhancements when new content is loaded
    $(document).on('page-change', function() {
        setTimeout(() => {
            enhanceListItems();
            enhanceButtons();
            enhanceCards();
        }, 500);
    });
    
    // Add gradient animation to primary buttons
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
});

// Custom theme selector integration
frappe.provide('frappe.ui.theme_switcher');

frappe.ui.theme_switcher.show_theme_switcher = function() {
    const themes = [
        { name: 'Light', value: 'light' },
        { name: 'Dark', value: 'dark' },
        { name: 'Capri Turquoise', value: 'capri_turquoise' }
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
                themeOption.innerHTML = '<i class="fa fa-paint-brush"></i> Change Theme';
                themeOption.onclick = function(e) {
                    e.preventDefault();
                    frappe.ui.theme_switcher.show_theme_switcher();
                };
                userMenu.appendChild(themeOption);
            }
        }, 1000);
    }
});
import frappe

def set_default_theme(login_manager):
    """Set Capri Turquoise as default theme for new users"""
    try:
        user = frappe.get_doc("User", login_manager.user)
        if not user.theme:
            user.theme = "capri_turquoise"
            user.save(ignore_permissions=True)
    except Exception as e:
        frappe.log_error(f"Error setting default theme: {str(e)}")

@frappe.whitelist()
def get_theme_colors():
    """Get theme colors for JavaScript usage"""
    return {
        "primary": "#00BFFF",
        "secondary": "#40E0D0", 
        "turquoise_light": "#66E6D8",
        "turquoise_dark": "#20B2AA",
        "light_blue": "#87CEEB",
        "gray": "#B8B8B8"
    }

def before_install():
    """Run before app installation"""
    pass

def after_install():
    """Run after app installation"""
    # Create theme record if it doesn't exist
    if not frappe.db.exists("Website Theme", "capri_turquoise"):
        create_theme_record()

def create_theme_record():
    """Create the theme record in database"""
    try:
        theme_doc = frappe.get_doc({
            "doctype": "Website Theme",
            "theme": "capri_turquoise",
            "theme_name": "Capri Turquoise",
            "custom": 1,
            "theme_scss": get_theme_scss()
        })
        theme_doc.insert(ignore_if_duplicate=True)
        frappe.db.commit()
    except Exception as e:
        frappe.log_error(f"Error creating theme record: {str(e)}")

def get_theme_scss():
    """Return theme SCSS variables"""
    return """
$primary: #00BFFF;
$secondary: #40E0D0;
$success: #28A745;
$info: #17A2B8;
$warning: #FFC107;
$danger: #DC3545;
$light: #F8F9FA;
$dark: #495057;

// Custom variables
$turquoise: #40E0D0;
$turquoise-light: #66E6D8;
$turquoise-dark: #20B2AA;
$capri-blue: #00BFFF;
$light-blue: #87CEEB;
"""
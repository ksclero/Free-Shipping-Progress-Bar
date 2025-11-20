# Free Shipping Progress Bar for PrestaShop

[![Support via PayPal](https://img.shields.io/badge/Support-PayPal-blue?logo=paypal)](https://www.paypal.com/paypalme/ettorestani)
[![PrestaShop](https://img.shields.io/badge/PrestaShop-1.7.x--8.2.x-blue.svg)](https://www.prestashop.com/)
[![Version](https://img.shields.io/badge/version-2.2.1-green.svg)](https://github.com/ksclero/Free-Shipping-Progress-Bar)
[![License](https://img.shields.io/badge/license-MIT-orange.svg)](https://opensource.org/licenses/MIT)
[![PHP](https://img.shields.io/badge/php-7.1%2B-blue.svg)](https://www.php.net/)

A comprehensive and customizable PrestaShop module that displays a visual progress bar showing customers how much they need to spend to qualify for free shipping. Encourage customers to add more products to their cart, increasing average order value.

## ⚠️ Disclaimer

This module is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement.

**Important:**
- ✅ Always test in a **development/staging environment** before production
- ✅ Create a **complete backup** of your store before installation
- ✅ Verify compatibility with your PrestaShop version and other modules
- ❌ The author is **not responsible** for any damage, data loss, or issues caused by using this module

**Use at your own risk.** For production environments, consider using [professional installation services](#-professional-services).

---

## ✨ Key Features

### Display Options
- **Animated progress bar** with real-time percentage indication
- **Three display modes:**
  - Cart page
  - Checkout page (before carrier selection)
  - Non-intrusive popup on product addition
- **Responsive design** optimized for desktop, tablet, and mobile
- **WCAG 2.1 Level AA accessibility** with full ARIA support

### Flexible Configuration
- **Customizable threshold:**
  - Use PrestaShop's configured value (`PS_SHIPPING_FREE_PRICE`)
  - Set a custom module-specific value
- **Multi-currency support** with automatic conversion
- **Color customization:**
  - Background color
  - Progress bar fill color
  - Normal message color
  - Success message color
- **Multilingual messages** fully customizable with dynamic placeholders

### Product Exclusion System (v2.1.0+)
- **Exclude virtual/downloadable products** from threshold calculation
- **Exclude specific categories** by ID (e.g., "5,12,18")
- **Exclude specific products** by ID (e.g., "10,25,47")

### Advanced Features
- **Real-time AJAX updates** when cart changes
- **CSRF protection** for all AJAX endpoints
- **Modern translation system** (XLIFF 1.2 - PrestaShop 1.7+)
- **Optimized performance** with intelligent debouncing
- **Configurable popup** with customizable duration and manual close

## 📦 Requirements

- **PrestaShop:** 1.7.x - 8.2.x
- **PHP:** 7.1+
- **Multistore:** Compatible
- **HTTPS:** Recommended for AJAX security

## 🚀 Installation

### Standard Installation
1. Download the latest version from [Releases](https://github.com/ksclero/Free-Shipping-Progress-Bar/releases)
2. Go to your PrestaShop back office
3. Navigate to **Modules** > **Module Manager** > **Upload a module**
4. Select the downloaded ZIP file
5. Click **Configure** after installation
6. Configure settings according to your needs

### Manual Installation
1. Extract the ZIP contents
2. Upload the `freeshippingprogress` folder to `/modules/` via FTP
3. In the back office, go to **Modules** > **Module Manager**
4. Search for "Free Shipping Progress Bar"
5. Click **Install**

## ⚙️ Configuration

### Display Settings
- **Show on cart page:** Enable/disable bar in cart
- **Show on checkout page:** Enable/disable bar in checkout
- **Show as popup:** Enable popup on product addition to cart
- **Popup duration (ms):** Auto-hide time (default: 5000ms)

### Threshold Configuration
- **Free shipping threshold source:**
  - **Use PrestaShop configuration:** Reads from Shipping > Preferences > Carrier management
  - **Custom value:** Set a specific amount
- **Custom threshold amount:** Amount in default currency (automatic conversion)

### Product Exclusion Settings (v2.1.0+)
- **Exclude virtual/downloadable products:** Don't count digital products
- **Excluded categories:** Comma-separated IDs (e.g., "5,12,18")
- **Excluded products:** Comma-separated IDs (e.g., "10,25,47")

### Visual Customization
- **Background color:** Bar background (default: #f5f5f5)
- **Progress bar color:** Progress fill (default: #2fb5d2)
- **Normal message color:** Text color when not reached (default: #333333)
- **Success message color:** Text color when reached (default: #4caf50)

### Custom Messages
- **Threshold not reached message:**
  - Use `{remaining_amount}` as placeholder for remaining amount
  - Example: "Add {remaining_amount} to get free shipping!"
- **Threshold reached message:**
  - Example: "Congratulations! You've got free shipping!"

## 🌍 Multilingual

The module fully supports PrestaShop 1.7+ translation system:
- **XLIFF translation:** Standard XML files for professional translations
- **Backend translation:** Use Translations > Modify translations in back office
- **Included languages:** Italian, English
- **Translation domain:** `Modules.Freeshippingprogress.Admin`

## 🐛 Troubleshooting

### Progress bar not displaying
1. Verify module is installed and active
2. Check threshold is not set to 0
3. Verify at least one display mode is active
4. Clear PrestaShop cache

### Translations not working
1. Go to **Translations** > **Modify translations** > **Module translations**
2. Select module "freeshippingprogress"
3. Edit desired translations
4. Save and clear cache

### Popup not appearing
1. Verify "Show as popup" is enabled
2. Check `FREESHIPPING_POPUP_DURATION` is > 0
3. Check JavaScript console for errors
4. Popup doesn't appear on cart page (expected behavior)

### Product exclusions not working
1. Verify IDs are comma-separated without spaces
2. Check product/category IDs are correct
3. Clear cart cache by adding/removing a product

## 📊 Compatibility

- ✅ PrestaShop 1.7.0 - 1.7.8
- ✅ PrestaShop 8.0 - 8.2
- ✅ PHP 7.1 - 8.2
- ✅ Multistore
- ✅ All standard PrestaShop themes
- ✅ Most custom themes

## 🔒 Security

- CSRF protection on all AJAX endpoints
- HTML escaping for all user data
- Server-side input validation
- Configuration parameter sanitization
- No direct SQL queries (PrestaShop ORM only)

## 💙 Support This Project

This module is **completely free** and will always be.

If you're using it in your business and it's saving you development time, please consider supporting its development:

**[💰 Support via PayPal](https://www.paypal.com/paypalme/ettorestani)**

Even a small contribution helps me:
- Keep the module updated with new PrestaShop versions
- Fix bugs faster
- Add new features based on community feedback

Thank you for your support! 🙏

---

*Business using this module? I also offer [professional services](#-professional-services).*

## 💼 Professional Services

Need help with your PrestaShop store? I offer:

- **🎨 Module Customization** - Tailored modifications to fit your specific needs
- **🛒 Complete PrestaShop E-commerce Development** - From setup to launch
- **⚡ Performance Optimization** - Speed up your store
- **🔧 Custom Module Development** - Build exactly what you need

**Contact:** info@ettorestani.it | **Website:** https://www.ettorestani.it

## 📄 License

This module is released under the [MIT License](LICENSE).

## 👤 Author

**Ettore Stani**
- Email: info@ettorestani.it
- Website: https://www.ettorestani.it


## 📝 Changelog

For complete version history, see [CHANGELOG.md](CHANGELOG.md).

**Latest version: 2.2.1** (2025-01-14)
- Fixed real-time data update issue
- Removed client-side caching
- Progress bar now updates immediately on cart changes

## ⭐ Show Your Support

If this module has been helpful:
- ⭐ Star this repository
- 🐦 Share it with other developers
- 🌍 Contribute translations or improvements
- 💰 [Support via PayPal](https://www.paypal.com/paypalme/ettorestani)

---

**Made with ❤️ by [Ettore Stani](https://www.ettorestani.it)**

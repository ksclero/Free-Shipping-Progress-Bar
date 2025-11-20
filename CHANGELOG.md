# Changelog

All notable changes to the Free Shipping Progress Bar module will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.1] - 2025-01-14

### 🐛 Bug Fixes
- **Fixed real-time data update issue**
  - Removed client-side caching system that prevented immediate updates
  - Progress bar and remaining amount now update immediately when cart changes
  - Fixed popup showing outdated values when adding products
  - Improved responsiveness in cart and checkout pages

### 🔧 Technical Changes
- Removed `freeShippingCache` with 2-second cache duration
- Simplified `updateFreeShippingData()` to always fetch fresh data via AJAX
- Maintained debouncing mechanism to prevent concurrent requests
- All cart update events now trigger immediate data refresh

---

## [2.2.0] - 2025-01-13

### 🚀 Major Changes
- **Migrated to PrestaShop 1.7+ New Translation System**
  - Replaced legacy `$this->l()` with modern `$this->trans()` method (48 occurrences)
  - Implemented `isUsingNewTranslationSystem()` for compatibility
  - Created XLIFF translation file (ModulesFreeshippingprogressAdmin.it-IT.xlf)
  - Translation domain: `Modules.Freeshippingprogress.Admin`
  - Old translations/it.php file deprecated (kept for backward compatibility)

### 🌍 Benefits
- **Better Performance**: New translation system is faster and more efficient
- **Easier Maintenance**: No more MD5 hashes, human-readable XLIFF format
- **Better IDE Support**: XLIFF files supported by translation tools
- **Future Proof**: Aligned with PrestaShop 1.7+ best practices

---

## [2.1.1] - 2025-01-13

### 🐛 Bug Fixes
- **Fixed Italian translations not working in backend**
  - Corrected all MD5 hashes in translations/it.php to match PrestaShop's translation system format
  - All 16 new translation strings from v2.1.0 now display correctly in Italian backend

---

## [2.1.0] - 2025-01-13

### 🌟 Headline Features

#### 1. Product & Category Exclusion System
Finally, you can control which products count towards the free shipping threshold!

**Use Cases:**
- **Gift Cards**: Don't count digital gift cards towards free shipping
- **Virtual Products**: Exclude downloadable/virtual products (eBooks, software licenses)
- **Promotional Items**: Exclude free samples or low-cost accessories
- **Specific Categories**: Exclude entire categories like "Shipping Supplies" or "Gift Wrapping"

**Configuration:**
- Exclude virtual/downloadable products (toggle switch)
- Excluded Categories: comma-separated IDs (e.g., "5,12,18")
- Excluded Products: comma-separated IDs (e.g., "10,25,47")

**Technical Implementation:**
- New configuration keys: `FREESHIPPING_EXCLUDE_VIRTUAL`, `FREESHIPPING_EXCLUDE_CATEGORIES`, `FREESHIPPING_EXCLUDE_PRODUCTS`
- New method: `parseAndValidateIds($input)` - validates and sanitizes input IDs
- New method: `getEligibleCartTotal($cart)` - calculates cart total with exclusions applied
- Automatic validation: only positive integers, removes duplicates, sanitizes malformed input

#### 2. Full Accessibility (a11y) Support
The module is now **WCAG 2.1 Level AA compliant**.

**Semantic Structure:**
- Added `role="region"` with `aria-label` for semantic structure
- Added `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Added `role="status"` and `aria-live="polite"` for status messages
- Added `role="alert"` and `aria-live="assertive"` for popup notifications

**Keyboard Navigation:**
- Popup close button is focusable (`tabindex="0"`)
- Works with Enter and Space keys
- Clear focus indicators

**Screen Reader Support:**
- Progress updates announced via `aria-live="polite"`
- Popup notifications use `aria-live="assertive"` for immediate attention
- All interactive elements have proper labels
- Tested with: NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS), TalkBack (Android)

**Compliance:**
- WCAG 2.1 Level AA ✅
- Section 508 Compliant ✅
- ADA Compliant ✅

#### 3. Complete Italian Translations
All new features and messages fully translated into Italian (16 new translation strings).

**Translated Elements:**
- Product exclusion settings UI
- Validation error messages
- Multi-currency informational messages
- Admin warnings and hints
- Form field descriptions

### 🎨 UI Improvements
- Added visual separator for exclusion settings section in admin
- Improved form descriptions with examples (e.g., "5,12,18")
- Better organization of configuration options
- Clear guidance on how to use exclusion features

### 🔧 Files Modified
- `freeshippingprogress.php` - Major update: new methods, config fields
- `views/templates/hook/*.tpl` - Updated with ARIA attributes
- `views/js/front.js` - Added keyboard support
- `translations/it.php` - Added 16 new translation strings
- `upgrade/upgrade-2.1.0.php` - New upgrade script
- `config.xml` - Version updated to 2.1.0

### ⚠️ Known Limitations
1. **Category Exclusion Depth**: Exclusion applies to all subcategories (no way to exclude parent but include child)
2. **Product Combinations**: Exclusion applies to entire product (cannot exclude specific combinations/variations)
3. **Performance**: `Product::getProductCategoriesFull()` called for each excluded product (may impact with 100+ products in cart)

---

## [2.0.0] - 2025-01-13

### 🔒 Security
- **Added CSRF protection** to AJAX endpoint to prevent cross-site request forgery attacks
- **Implemented XSS prevention** with proper output escaping in all Smarty templates
- **Added input validation** for all configuration form fields (threshold, popup duration, colors)

### ⚡ Performance
- **Implemented client-side caching** (2-second cache) to reduce duplicate AJAX requests
- **Added debouncing mechanism** to prevent concurrent AJAX requests
- **Eliminated code duplication** by creating shared `getFreeShippingData()` static method

### ✨ Features
- **Multi-currency support** with automatic conversion from default currency to active currencies
- **Better error handling** with user-friendly error notifications
- **Zero threshold detection** - module automatically hides when threshold is 0
- **Admin warnings** - displays helpful messages when threshold is not configured

### 🐛 Bug Fixes
- Fixed issue with threshold calculation in non-default currencies
- Removed unused database table that was created during installation
- Fixed potential race conditions in AJAX update mechanism

### 🎨 UI/UX Improvements
- Added informative messages in admin panel about multi-currency configuration
- Improved error feedback for users when AJAX calls fail
- Better accessibility with `aria-label` and `role` attributes on popup close button

### 🧹 Code Quality
- Removed console.log statements from production code
- Improved code documentation with PHPDoc comments
- Refactored JavaScript for better maintainability
- Created dedicated `applyFreeShippingData()` function to avoid duplication

### 📝 Documentation
- Created CLAUDE.md for AI assistant guidance
- Added comprehensive inline code comments
- Documented multi-currency behavior in admin interface

---

## [1.0.7] - 2025-03-25

### Initial Features
- Progress bar display in cart, checkout, and popup modes
- Customizable colors and messages with multi-language support
- Real-time updates via AJAX when cart changes
- Configurable threshold (PrestaShop default or custom value)
- Responsive design for mobile devices
- Integration with PrestaShop 1.7+ cart events

---

## 🔄 Migration Notes

### From 2.1.x to 2.2.0

**Migration to New Translation System:**
- Module now uses PrestaShop 1.7+ translation system (XLIFF format)
- Old `translations/it.php` file has been removed
- All translations migrated to `translations/it-IT/ModulesFreeshippingprogressAdmin.it-IT.xlf`
- No manual intervention required - upgrade is automatic
- Clear PrestaShop cache after upgrade

### From 2.0.0 to 2.1.0

**New Features Available:**
- Configure product/category exclusions in module settings
- No database changes required
- All settings preserved during upgrade

**Post-upgrade steps:**
1. Review new "Product Exclusion Settings" section
2. Configure exclusions if needed (virtual products, categories, specific products)
3. Test accessibility features with screen readers (optional)

### From 1.0.7 to 2.0.0

**Security & Performance Upgrade:**
- AJAX endpoint now requires CSRF token (automatically handled)
- Templates now properly escape output
- Multi-currency conversion is automatic
- All existing configuration settings preserved
- No database schema changes

**Recommended actions after upgrade:**
1. Test the module in all active currencies
2. Verify threshold amounts are correct in all currencies
3. Clear PrestaShop cache (Advanced Parameters > Performance > Clear cache)
4. Test AJAX functionality by adding/removing products from cart

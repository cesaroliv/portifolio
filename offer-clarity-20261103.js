/* Only connects the design-study text link to the existing accessible preview dialog. */
(()=>{'use strict';document.querySelectorAll('[data-case-preview]').forEach(button=>button.addEventListener('click',()=>{const card=button.closest('.studio-case');card?.querySelector('[data-preview-expand]')?.click();}));})();

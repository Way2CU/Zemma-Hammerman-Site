# Deployment checklist

All of these need to be checked manually, changed and then committed. System will refuse to deploy the site if some of the checkboxes are left empty. To keep things consistent items that were checked and found to be okay developer needs to mark with `x` while items that don't apply need to be marked with `x` and list item prepended with `>`.

- Site specific items:
	- [ ] `system_init.xml` file contains all the modules used;
	- [ ] Deployment script `group_vars/all` file is configured;
	- [ ] Deployment `hosts.txt` file is configured;
	- [ ] All the languages site is targeting are configured in `config.php`;
	- [ ] Site title is properly defined;
	- [ ] No errors or warnings are reported in the log file;
	- [ ] Templates for registering and recovering user password are created and selected;
	- [ ] PNG images are optimized using `optipng` command;
	- [ ] JPEG images are converted from original PNG and optimized using `guetzli` command;
	- [ ] SVG images are cleaned and optimized;
	- [ ] Site has favicon specified in different sizes (16, 32, 64);
	- [ ] All active elements of the site have `:hover` and `:focus` styles defined;
	- [ ] Site has copyright;
	- [ ] `README.md` file updated appropriately with licensing information;
	- [ ] Code in `main.js` targets all pages. Code meant for individual pages is in separate files;
	- [ ] Styles are written to target LTR by default with RTL modifications, even on RTL-only sites.
- Contact form:
	- [ ] SendGrid API access is configured;
	- [ ] Mandrill API access is configured;
	- [ ] SMTP credentials are configured and working;
	- [ ] Default sender email;
	- [ ] Default recipient;
	- [ ] Forms have honeypot field;
	- [ ] Templates for each form are created and assigned to form;
	- [ ] Templates have subject properly defined;
	- [ ] Form submits and client/developer receives email.
- Shop:
	- [ ] Desired payment method is enabled and configured;
	- [ ] Default warehouse is created;
	- [ ] Default currency is selected;
	- [ ] Contact form template for transaction is created and selected;
	- [ ] Shop is not in testing mode.
- Articles:
	- [ ] Each article has a title even if it's not used;

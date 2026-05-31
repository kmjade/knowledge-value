<%*
const {LTDListInputSectionHeading, LTDListOutputSectionHeading, LTDListOutcomeSectionHeading, defaultTDLDateFormat, projectNameFormat, defaultTDLHeadingLevel} = app.plugins.plugins["ioto-settings"].settings;
_%>

<% defaultTDLHeadingLevel + " " + LTDListInputSectionHeading %>

- [ ] 

<% defaultTDLHeadingLevel + " " + LTDListOutputSectionHeading %>

- [ ] 

<% defaultTDLHeadingLevel + " " + LTDListOutcomeSectionHeading %>

- [ ] <% tp.file.cursor() %>
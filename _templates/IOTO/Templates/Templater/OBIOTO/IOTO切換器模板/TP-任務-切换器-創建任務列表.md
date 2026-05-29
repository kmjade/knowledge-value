<%*
/*
** type: switcher
** for: task
*/
_%>
<%* 

console.dir(tp.config.active_file);
const ml = new (tp.user.IOTOMultiLangs(tp))(tp);
const {LTDListInputSectionHeading, LTDListOutputSectionHeading, LTDListOutcomeSectionHeading, defaultTDLDateFormat, projectNameFormat, defaultTDLHeadingLevel} = app.plugins.plugins["ioto-settings"].settings;

const utilClass = tp.user.IOTOUtility(tp, app);
const util = new utilClass(tp, app);
const folder = tp.file.folder(true);
const pathMode = false; 
const prefix = pathMode ? folder : folder.split("/").last();
const projectName = await tp.user.IOTOCreateProjectName(tp.file.folder(true), projectNameFormat);

const frontMatter = {
	Project: `["${projectName}"]`,
	cssclasses: '["hideProperties", "iotoTDL"]'
}

const switchers = [
    { match: "Demo", template: `My-TP-${ml.t("Task")}-Demo` }
];

const matched = switchers.find(item => prefix.includes(item.match));
let includedNote = "";

const templates = {
  note: "IOTODefaultTaskNoteTemplate",
  subject: "IOTODefaultSubjectNoteTemplate",
  plan: "IOTODefaultPlanNoteTemplate",
};

const [defaultNoteTemplate, defaultSubjectTemplate, defaultPlanTemplate] = await Promise.all(
  Object.values(templates).map(async key => {
    const tFile = tp.file.find_tfile(ml.t(key));
    return tFile ? await tp.user.IOTOLoadTemplate(tp, tR, app, ml.t(key)) : "";
  })
);

if (matched && !tp.file.title.includes(ml.t("Subject"))) {
	const matchedTemplate = tp.file.find_tfile(matched.template);
	includedNote = matchedTemplate ? (await tp.file.include(`[[${matched.template}]]`)) : defaultNoteTemplate; 
} else if(tp.file.title.includes(`-${ml.t("Subject")}-`)) {
	frontMatter.Subject = [`"${tp.file.title.split("-").last()}"`];
	includedNote = defaultSubjectTemplate;
} else if(tp.file.title.includes(`-${ml.t("Plan")}-`)) {
	frontMatter.Subject = [`"${tp.config.active_file.basename.split("-").last()}"`];
	frontMatter.Plan = [`"${tp.file.title.split("-").last()}"`];
	frontMatter.SubjectTDL = `"[[${tp.config.active_file.basename}]]"`;
	includedNote = defaultPlanTemplate;
} else {
	includedNote = defaultNoteTemplate;
}

tR += util.noteFrontMatterCooker(frontMatter, includedNote);
_%>

<%* if (tp.file.title.toLowerCase().includes(ml.t("Untitle"))) {
	await tp.file.rename(projectName + "-" + tp.date.now(defaultTDLDateFormat));
} _%>
<%*
/*
** type: selector
** for: task
*/
const {taskFolder, useUserTemplate, defaultTDLDateFormat, projectNameFormat, taskSelectorExcludesPaths, taskSelectorShowOptionOrder, taskSelectorShowBasePath, taskSelectorFolderOptionTemplate, taskSelectorEnableFutureDaysChoices, taskSelectorUseCustomTdlNames} = app.plugins.plugins["ioto-settings"].settings;

const ml = new (tp.user.IOTOMultiLangs(tp))(tp);

const folderSettings = {

    folderPath: taskFolder,
	showSubFolders: true,
    excludesPaths: taskSelectorExcludesPaths ? taskSelectorExcludesPaths.split("\n") : [],
    showBasePathInOption: taskSelectorShowBasePath,
    optionContentTemplate: taskSelectorFolderOptionTemplate,
    showOptionOrder: taskSelectorShowOptionOrder,

}

const switcherTemplate = await tp.user.IOTOLoadTemplate(tp, tR, this.app, ml.t("IOTODefaultTaskSwitcherTemplate"), false);

const noteSettings = {

    template: switcherTemplate,
    enableFutureDaysChoices: taskSelectorEnableFutureDaysChoices,
    timestampFormat: defaultTDLDateFormat,
    projectNameFormat: projectNameFormat,
    useCustomTDLName: taskSelectorUseCustomTdlNames,
	createPlanMode: false,
}

let folderPath = "";

const isSubjectFile = tp.file.title.includes(`-${ml.t("Subject")}-`);
const isInTaskFolder = tp.file.folder(true).startsWith(taskFolder);
const isTaskSubject = isSubjectFile && isInTaskFolder;
let createPlan;

if(isTaskSubject) {
	createPlan = await tp.system.suggester([ml.t("CreatePlan"), ml.t("CreateTDL")], [1, 2]);
}

noteSettings.createPlanMode = createPlan === 1;

if(noteSettings.createPlanMode) {
	folderPath = tp.file.folder(true);
} else {
	if(folderSettings.showSubFolders) {
		folderPath = await tp.user.IOTOGetFolderOption(tp, folderSettings);
	} else {
		folderPath = folderSettings.folderPath; 
	}
}

tR += await tp.user.IOTOCreateTasksList(tp, folderPath, noteSettings) || "";
_%>

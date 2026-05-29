async function IOTOLoadTemplate(tp, tR, app, defaultTemplate, include = true) {
  const iotoUtility = new (tp.user.IOTOUtility(tp, app))(tp, app);
  const hasIOTO = !!app.plugins.plugins["ioto-update"]?.settings;
  const hasOBSyncWithMDB = !!app.plugins.plugins["ob-sync-with-mdb"]?.settings;
  if (hasIOTO && !iotoUtility.checkIOTOUserPermission()) {
    return "";
  }
  if (hasOBSyncWithMDB && !iotoUtility.checkOBSyncWithMDBUserPermission()) {
    return "";
  }
  const { useUserTemplate, userTemplatePrefix } =
    app.plugins.plugins["ioto-settings"].settings;
  const templatePrefix = userTemplatePrefix || "My";
  const templateToUse = useUserTemplate
    ? tp.file.find_tfile(`${templatePrefix}-${defaultTemplate}`)
      ? `${templatePrefix}-${defaultTemplate}`
      : tp.file.find_tfile(`My-${defaultTemplate}`)
        ? `My-${defaultTemplate}`
        : defaultTemplate
    : defaultTemplate;

  if (include) {
    const file = tp.file.find_tfile(templateToUse);
    tR += await tp.file.include(file);
    return tR;
  } else {
    return templateToUse;
  }
}

module.exports = IOTOLoadTemplate;

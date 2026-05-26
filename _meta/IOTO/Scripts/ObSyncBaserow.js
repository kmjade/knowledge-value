/*
 ** Script Name: OB Sync To Baserow
 ** Author: Johnny
 ** Bilibili: https://space.bilibili.com/432408734
 ** Version: 1.0.0
 */

async function obSyncBaserow(
  tp,
  app,
  nocoDBSettings,
  syncConfig = {
    fetchOnly: false,
    updateNotesInOB: true,
    defaultSyncOption: 0,
  },
) {
  const IOTOUtility = new (tp.user.IOTOUtility(tp, app))(tp, app);
  if (!IOTOUtility.checkDBSettings(nocoDBSettings, "baserow")) {
    return;
  }
  tp.IOTOConfigText = tp.user.IOTOConfigText();
  const MyObSyncer = tp.user.IOTOObSyncer(tp);
  const MyNocoDB = tp.user.IOTOBaserowDB(tp);
  const MyNocoDBSyncer = tp.user.IOTOBaserowSyncer(tp);
  const myNocoDB = new MyNocoDB(nocoDBSettings);
  const myNocoDBSyncer = new MyNocoDBSyncer(
    myNocoDB,
    tp,
    app,
    syncConfig.updateNotesInOB ?? true,
  );
  const myObSyncer = new MyObSyncer(tp, app, myNocoDBSyncer);
  return await myObSyncer.syncWithNocoDB(
    syncConfig.fetchOnly ?? false,
    syncConfig.defaultSyncOption ?? 0,
  );
}

module.exports = obSyncBaserow;

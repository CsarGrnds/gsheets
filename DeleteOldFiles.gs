function DeleteOldFiles() {
  var Folders = new Array(
    //'1CHv7euzQcJl-YYmC4s0TZUYhaPiEz3SR', // Directorio de pruebas
    '1EjKldeV8hOTUk3ZLMQP-HQv5fZeAMYUU' // Passwords temporales 
  );
  var Files;

  Logger.clear();

  for (var key in Folders) {
    Folder = DriveApp.getFolderById(Folders[key])
    Files = Folder.getFiles();
	
	Logger.log('Abriendo directorio: ' + Folder.getName());

    while (Files.hasNext()) {
      var File = Files.next();

      if (new Date() - File.getLastUpdated() > 3 * 24 * 60 * 60 * 1000) {
        File.setTrashed(true); // Places the file in the Trash folder
        //Drive.Files.remove(File.getId()); // Permanently deletes the file
        Logger.log('File ' + File.getName() + ' Fue eliminado.');
      }
    }
  }

  if(Logger.getLog() != '')
    MailApp.sendEmail('csar.grnds@gmail.com', 'Passwords temporales eliminados', Logger.getLog());
};


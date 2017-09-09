/**
 * Created by Ravy on 17.03.2017.
 */
/**
 * Сборка всего сервера и его частей в единый механизм
 */
require('./server/system/db.connect.js');
require('./server/system/http.server.js');
require('./server/system/ws.service.js');
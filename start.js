/**
 * Created by Ravy on 17.03.2017.
 */
/**
 * Сборка всего сервера и его частей в единый механизм
 */
console.log('********* USPY SERVER - HTTP / WS / NODEJS / MONGODB - v1 *********')
require('./server/db.connect.js');
require('./server/http.server.js');
require('./server/ws.service.js');
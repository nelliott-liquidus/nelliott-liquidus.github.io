import dotenv from 'dotenv/config'
import { log } from '../utils/Log'
import Backbone from 'backbone'
import request from 'request'




async function GET_Login (req, res) {

  res.render('pages/login', {})

}

class LiquidusAuthentication extends Backbone.Model{

  initialize(options) {
    this.options = options;
    this.listenTo(this, 'sync', this.loginSuccess);
    this.listenTo(this, 'error', this.loginError);
  }

  login(_username, _password) {

    request({
        url: `${ process.env.GOLDLEADER_URL}Token`,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
          'Cache-Control': 'max-age=0'
        },
        method: 'POST',
        form: {
            grant_type: 'password',
            client_id: process.env.GOLDLEADER_CLIENT_ID,
            username: _username,
            password: _password
        }
    }, (err, res, body) => {

        if (!err && res.statusCode == 200) {
            this.trigger('loginsuccess', body);

        } else {
            this.trigger('loginfail', res);
        }
    });




  }

  checkToken() {
    var self = this;
    $.ajax({
      type: "POST",
      url: self.options.api + "Token",
      contentType: "application/x-www-form-urlencoded",
      data: {
        "grant_type": "refresh_token",
        "client_id": self.options.client_id,
        "refresh_token": localStorage.getItem('refreshtoken')
      },
      success: function(data) {
        self.SetAuthStorage(data);
      },
      error: function() {
        self.kickUser('You were logged out due to inactivity.');
      }
    });
  }

  kickUser(reason) {
    this.ClearAuthStorage();
    this.trigger('kickUser', {reason: reason});
  }

  SetAuthStorage(data) {
    localStorage.setItem('username', data.userName);
    localStorage.setItem('user_id', data.id);
    localStorage.setItem('roleName', data.roleName);
    localStorage.setItem('role_id', data.roleId);
    localStorage.setItem('liqtoken', data.access_token);
    localStorage.setItem('refreshtoken', data.refresh_token);
  }

  ClearAuthStorage(){
    //Kill all authentication related localStorages
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    localStorage.removeItem('roleName');
    localStorage.removeItem('liqtoken');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('isAdmin');
  }
}




async function POST_Login (req, res) {
  const Auth = new LiquidusAuthentication({ api: `${ process.env.GOLDLEADER_URL }`, client_id: `${ process.env.GOLDLEADER_CLIENT_ID }` });
  Auth.on('loginsuccess', (response) => {
    log('SUCCESS');
    res.end(response)

  })
  Auth.on('loginfail', (response) => {
    log('fail')
    log(response)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  })

  Auth.login( req.body.username, req.body.password)






}

export { GET_Login, POST_Login }

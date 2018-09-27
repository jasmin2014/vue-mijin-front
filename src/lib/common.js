const devUrl = 'http://mijin.fengdai.org/';
const Url = 'http://www.360mijin.com/';
let _locationhref = window.location.href;
const localURL = _locationhref.substring(0,_locationhref.indexOf("#"));

export default  {
  devUrl,
  Url,
  localURL
}
